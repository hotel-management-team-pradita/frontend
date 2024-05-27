import {
  filterIcon,
  profileIcon,
  searchIcon,
  logoutIcon,
  settingIcon,
} from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { airbnbLogo } from "@/assets/images";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchUser from "@/lib/fetchUser";
import axiosInstance from "@/lib/axiosInstance";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dateDifferenceInDays = (date1, date2) => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const timeDifference = Math.abs(secondDate - firstDate);
  const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return differenceInDays;
};

const RoomDetailPage = () => {
  const authUser = fetchUser();
  const [profileClicked, setProfileClicked] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState({
    from: Date.now(),
    to: addDays(Date.now(), 5),
  });
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRoom = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axiosInstance.get(`/Room/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room:", error.message);
      }
    };

    fetchRoom();
  }, [id]);

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const reservationHandler = async () => {
    try {
      const user = fetchUser();
      const response = await axiosInstance.post(`/Reservation`, {
        UserId: user.id,
        RoomId: id,
        TotalPrice:
          room.price * dateDifferenceInDays(date.from ?? 0, date.to ?? 0),
        StartDate: new Date(date.from),
        EndDate: new Date(date.to),
      });
      setRoom(response.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to fetch room:", error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="w-full h-full">
        <header>
          {/* Navbar */}
          <nav className="h-28 relative">
            <div className="flex items-center justify-between w-full h-full px-16 border-b gap-7 border-b-slate-200">
              {/* Airbnb logo */}
              <Link to={"/"}>
                <img
                  src={airbnbLogo}
                  alt="airbnbLogo"
                  className="w-32"
                />
              </Link>

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

        <main className="w-full p-16 ">
          <div className="flex justify-between w-full overflow-hidden rounded-2xl gap-8">
            <div className="w-1/2 ">
              {/* Ini udah bener, cuma gambarnya aja ga muncul */}
              <img
                src={room.image}
                alt="hotelImg"
                className="object-cover w-full h-[70vh] rounded-2xl"
              />
              {/* Room Description */}
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold">{room.location}</h1>{" "}
                <p>{room.description}</p>{" "}
              </div>
              <div className="flex justify-between w-full flex-col">
                {/* Price */}
                <div className="w-full px-10 py-10 border rounded-2xl">
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                      {formatPrice(room.price)}{" "}
                      <span className="text-2xl font-normal">night</span>
                    </h1>
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

                  {/* Reserve button */}
                  <button
                    onClick={() => reservationHandler()}
                    className="w-full h-10 mt-5 font-semibold text-white rounded-lg bg-pink"
                  >
                    Reserve
                  </button>

                  {/* Total price */}
                  <div className="flex justify-between mt-5 text-xl">
                    <span>
                      {formatPrice(room.price)} x{" "}
                      {dateDifferenceInDays(date.from, date.to)} nights
                    </span>
                    <span>
                      {formatPrice(
                        room.price *
                          dateDifferenceInDays(date.from ?? 0, date.to ?? 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomDetailPage;
