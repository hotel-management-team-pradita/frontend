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
import { Note, NoteBlank, Trash } from "@phosphor-icons/react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const authUser = fetchUser();
  const [profileClicked, setProfileClicked] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [payments, setPayments] = useState([]);

  const deleteReservation = async (id) => {
    // reservations.find((r) => r.ReservationId == id);
    await axiosInstance.delete(`/Reservation/${id}`);
    fetchPayments();
    fetchReservations();
  };

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get("/Room");
      setRooms(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        setRooms([]);
      }
      console.error("Failed to fetch rooms:", error.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get("/Payment");
      setPayments(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        setPayments([]);
      }
      console.error("Failed to fetch rooms:", error.message);
    }
  };

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axiosInstance.get("/Reservation");
      setReservations(response.data.filter((r) => r.userId == authUser.id));
    } catch (error) {
      if (error.response.status == 404) {
        setReservations([]);
      }
      console.error("Failed to fetch reservations:", error.message);
    }
  };

  const payReservations = async (r) => {
    await axiosInstance.post("/Payment", {
      ReservationId: r.reservationId,
      Discount: 0,
      PaymentDate: new Date(Date.now()),
    });

    fetchPayments();
    fetchReservations();
  };

  useEffect(() => {
    fetchPayments();
    fetchRooms();
    fetchReservations();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const reorderReservation = (reservation) => {
    setReservations((r) => [...r, reservation]);
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
            <Link to={"/"}>
              <img
                src={airbnbLogo}
                alt="airbnbLogo"
                className="w-32"
              />
            </Link>

            {/* Account logo */}
            <div className="flex items-center gap-8">
              <Link to={"/payment"}>
                <Note className="size-6" />
              </Link>
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
          </div>
        </nav>
      </header>
      <main className="p-16">
        <h1 className="text-xl font-bold">Reservations</h1>
        <div className="flex flex-col gap-4 mt-5">
          {reservations.map((r, index) => (
            <div
              className="flex items-center  justify-between border p-4 rounded-xl"
              key={index}
            >
              <div>
                <p>{rooms.find((ro) => ro.roomId == r.roomId).name}</p>
                <p>{formatPrice(r.totalPrice)}</p>
              </div>
              {/* {r.status} */}
              <div className="flex gap-4 items-center">
                {payments.find((p) => p.reservationId == r.reservationId) ? (
                  <div
                    onClick={() => reorderReservation(r)}
                    className="rounded-full p-2 px-4 border text-sm bg-black text-white cursor-pointer"
                  >
                    Reorder
                  </div>
                ) : (
                  <div
                    onClick={() => payReservations(r)}
                    className="rounded-full p-2 px-4 border text-sm bg-black text-white cursor-pointer"
                  >
                    Pay
                  </div>
                )}

                <div
                  onClick={() => deleteReservation(r.reservationId)}
                  className="border rounded-xl p-2 cursor-pointer text-black"
                >
                  <Trash />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
