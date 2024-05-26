import { filterIcon, profileIcon, searchIcon } from "../../assets/icons";
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
import { Link } from "react-router-dom";

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/Room");
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

  return (
    <div className="w-full h-full">
      <header>
        {/* Navbar */}
        <nav className="h-28">
          <div className="flex items-center justify-between w-full h-full px-10 border-b gap-7 border-b-slate-200">
            {/* Airbnb logo */}
            <img src={airbnbLogo} alt="airbnbLogo" className="w-32" />

            {/* Search bar */}
            <div className="flex items-center justify-between w-full h-16 px-8 overflow-hidden border rounded-full border-slate-300">
              {/* Room */}
              <div className="flex flex-col w-1/3 pr-1 border-r border-r-slate-300">
                <label htmlFor="" className="">
                  Room
                </label>
                <input
                  type="text"
                  className="-mt-1 border-none focus:ring-0 focus:outline-none"
                  placeholder="Room"
                />
              </div>
              {/* Check in */}
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="">Check in - Check out</label>
                <div className={cn("grid gap-2")}>
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
                    <PopoverContent className="w-auto p-0" align="start">
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
              <div className="flex items-center justify-center border rounded-full bg-pink size-10">
                <img src={searchIcon} alt="searchIcon" className="size-4" />
              </div>
            </div>

            {/* Account logo */}
            <div className="flex items-center justify-center h-12 p-1 border rounded-full w-14 border-slate-400">
              <img src={profileIcon} alt="profileIcon" />
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="px-10 mb-96">
        <div className="grid grid-cols-4 gap-5 mt-10">
          {rooms.map((room) => (
            <div key={room.roomId} className="mt-10">
              <Link to={`/Room/${room.roomId}`}>
                <div className="w-full h-[400px] border">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={room.image}
                      alt="hotelImg"
                      className="w-full h-[300px]"
                    />
                  </div>
                  {/* Description */}
                  <div className="flex flex-col h-[100px] justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{room.name}</span>
                      <span
                        id="status"
                        className={`w-5 h-3 rounded-full ${
                          room.status === "available"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      ></span>
                    </div>
                    <p className="text-slate-500">{room.description}</p>
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
