import {
  filterIcon,
  profileIcon,
  searchIcon,
  logoutIcon,
  settingIcon,
} from "../../assets/icons";
import { airbnbLogo, hotelImg1 } from "../../assets/images";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import fetchUser from "@/lib/fetchUser";

const HomePage = () => {
  const navigate = useNavigate();
  const authUser = fetchUser();
  const [profileClicked, setProfileClicked] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get("/Room");
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error.message);
      }
    };

    fetchRooms();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <header>
        {/* Navbar */}
        <nav className="h-28 relative">
          <div className="flex items-center justify-between w-full h-full px-16 border-b gap-7 border-b-slate-200">
            {/* Airbnb logo */}
            <img
              src={airbnbLogo}
              alt="airbnbLogo"
              className="w-32"
            />

            {/* Search bar */}
            <div className="flex items-center justify-between w-1/2 h-16 px-8 gap-4 overflow-hidden border rounded-full border-slate-300">
              {/* Room */}
              <div className="flex flex-col w-full pr-1 border-r border-r-slate-300">
                <input
                  type="text"
                  className="border-none focus:ring-0 focus:outline-none text-sm"
                  placeholder="Type the room name you want"
                />
              </div>
              {/* Check in */}
              <div className="flex w-1/2 flex-col items-center justify-center">
                {/* <label htmlFor="">Check in - Check out</label> */}
                <div className={cn("grid gap-2 text-center")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center aspect-square w-auto justify-center border rounded-full bg-pink size-10">
                <img
                  src={searchIcon}
                  alt="searchIcon"
                  className="size-4"
                />
              </div>
            </div>

            {/* Account logo */}
            <div
              onClick={() => setProfileClicked((prev) => !prev)}
              className={cn(
                "flex items-center aspect-square justify-center h-12 p-1 border rounded-full border-slate-400 relative cursor-pointer"
              )}
            >
              <img
                src={profileIcon}
                alt="profileIcon"
              />
              <div
                className={cn(
                  "absolute w-32 h-auto top-[110%] border rounded-xl bg-white right-0",
                  { hidden: profileClicked }
                )}
              >
                <Link
                  to={"/admin"}
                  className={cn(
                    "w-full p-2 flex justify-center items-center gap-2 border-b cursor-pointer hover:bg-gray-100 rounded-t-xl",
                    { hidden: authUser.email != "admin@gmail.com" }
                  )}
                >
                  <img
                    src={settingIcon}
                    alt=""
                    className="size-5"
                  />
                  Admin
                </Link>

                <div
                  onClick={logoutHandler}
                  className="w-full p-2 flex justify-center items-center gap-2 border-b cursor-pointer hover:bg-gray-100 rounded-t-xl"
                >
                  <img
                    src={logoutIcon}
                    alt=""
                    className="size-5"
                  />
                  Logout
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="px-16 mb-96">
        <div className="grid grid-cols-5 gap-12 mt-10">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className="mt-10"
            >
              <Link to={`/Room/${room.roomId}`}>
                <div className="w-full ">
                  <div className="overflow-hidden rounded-2xl mb-2">
                    <img
                      src={room.image}
                      alt="hotelImg"
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                  {/* Description */}
                  <div className="flex flex-col gap-2 justify-between relative ">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{room.name}</span>
                        {room.status != "0" ? (
                          <span className="px-4 py-1 rounded-full border text-xs text-red-500 border-red-500">
                            Fully Reserved
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="text-gray-500 font-extralight -mt-1">
                        {room.description}
                      </p>
                    </div>
                    {/* Price */}
                    <p className="font-medium">
                      {formatPrice(room.price)}{" "}
                      <span className="font-normal">/night</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
