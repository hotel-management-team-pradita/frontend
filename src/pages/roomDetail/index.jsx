import { profileIcon } from "@/assets/icons";
import { airbnbLogo, hotelImg1 } from "@/assets/images";
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

const RoomDetailPage = () => {
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
    <div>
      <div className="w-full h-full">
        <header>
          {/* Navbar */}
          <nav className="h-28">
            <div className="flex items-center justify-between w-full h-full px-10 border-b gap-7 border-b-slate-200">
              {/* Airbnb logo */}
              <img src={airbnbLogo} alt="airbnbLogo" className="w-32" />

              {/* Account logo */}
              <div className="flex items-center justify-center h-12 p-1 border rounded-full w-14 border-slate-400">
                <img src={profileIcon} alt="profileIcon" />
              </div>
            </div>
          </nav>
        </header>

        <main className="w-[1000px] px-10 mb-96">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={hotelImg1}
              alt="hotelImg"
              className="object-cover w-full"
            />
            <div className="flex justify-between mt-5">
              {/* Room Description */}
              <div>
                <h1 className="text-3xl font-bold">Abiansemal, Indonesia</h1>
                <p>Hotel ini merupakan...</p>
                <p>Status: Kosong</p>
              </div>
              {/* Price */}
              <div className="px-10 py-10 border shadow-2xl w-96 rounded-2xl">
                <h1 className="text-3xl font-bold">
                  {formatPrice(80000)}{" "}
                  <span className="text-2xl font-normal">night</span>
                </h1>
                <div className="flex flex-col items-center justify-center mt-8">
                  <label htmlFor="" className="text-2xl font-semibold">
                    Check in - Check out
                  </label>
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

                {/* Reserve button */}
                <button className="w-full h-10 mt-5 font-semibold text-white rounded-lg bg-pink">
                  Reserve
                </button>

                {/* Total price */}
                <div className="flex justify-between mt-5 text-xl">
                  <span>{formatPrice(80000)} x 5 nights</span>
                  <span>{formatPrice(400000)}</span>
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
