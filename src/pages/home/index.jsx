import { filterIcon, profileIcon, searchIcon } from "../../assets/icons";
import { airbnbLogo, hotelImg1 } from "../../assets/images";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HomePage = () => {
  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

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
        <div className="flex justify-between mt-10">
          {/* Categories */}
          <div className="w-full text-center">ICON</div>

          {/* Filter button */}
          <div className="w-[92px] h-12 border rounded-xl flex justify-center items-center gap-2">
            <img src={filterIcon} alt="filterIcon" className="size-4" />
            <span className="font-semibold">Filters</span>
          </div>
        </div>

        {/* Card */}
        <div className="grid grid-cols-4 gap-5">
          <div className="mt-10">
            <div className="w-full h-[400px] border">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hotelImg1}
                  alt="hotelImg"
                  className="w-full h-[300px]"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col h-[100px] justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Abiansemal, Indonesia</span>
                  <span
                    id="status"
                    className="w-5 h-3 bg-green-600 rounded-full"
                  ></span>
                </div>
                <p className="text-slate-500">Hotel ini merupakan hotel...</p>
                <p className="font-medium">
                  {formatPrice(80000)}{" "}
                  <span className="font-normal">/night</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-full h-[400px] border">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hotelImg1}
                  alt="hotelImg"
                  className="w-full h-[300px]"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col h-[100px] justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Abiansemal, Indonesia</span>
                  <span
                    id="status"
                    className="w-5 h-3 bg-green-600 rounded-full"
                  ></span>
                </div>
                <p className="text-slate-500">Hotel ini merupakan hotel...</p>
                <p className="font-medium">
                  {formatPrice(80000)}{" "}
                  <span className="font-normal">/night</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-full h-[400px] border">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hotelImg1}
                  alt="hotelImg"
                  className="w-full h-[300px]"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col h-[100px] justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Abiansemal, Indonesia</span>
                  <span
                    id="status"
                    className="w-5 h-3 bg-green-600 rounded-full"
                  ></span>
                </div>
                <p className="text-slate-500">Hotel ini merupakan hotel...</p>
                <p className="font-medium">
                  {formatPrice(80000)}{" "}
                  <span className="font-normal">/night</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-full h-[400px] border">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={hotelImg1}
                  alt="hotelImg"
                  className="w-full h-[300px]"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col h-[100px] justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Abiansemal, Indonesia</span>
                  <span
                    id="status"
                    className="w-5 h-3 bg-green-600 rounded-full"
                  ></span>
                </div>
                <p className="text-slate-500">Hotel ini merupakan hotel...</p>
                <p className="font-medium">
                  {formatPrice(80000)}{" "}
                  <span className="font-normal">/night</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
