import { profileIcon, settingIcon, logoutIcon } from "@/assets/icons";
import { airbnbLogo } from "@/assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import { Trash, Pencil, XCircle } from "@phosphor-icons/react";
import { ChevronLeftCircle, HomeIcon } from "lucide-react";
import fetchUser from "@/lib/fetchUser";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [profileClicked, setProfileClicked] = useState(true);
  const authUser = fetchUser();

  // Data
  const [reservations, setReservations] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listRooms, setListRooms] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [editMode, seteditMode] = useState();

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({});

  // Dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const closeModal = () => {
    setShowModal(false);
    seteditMode(null);
    setSelectedUser("");
    setSelectedRoom("");
    setStartDate(null);
    setEndDate(null);
  };

  const modalHandler = () => {
    setShowModal(true);
  };

  const updateModalHandler = (data) => {
    setShowModal(true);

    setSelectedUser(listUsers.find((u) => u.userId == data.userId).fullname);
    setSelectedRoom(listRooms.find((r) => r.roomId == data.roomId).name);
    setStartDate(new Date(data.startDate));
    setEndDate(new Date(data.endDate));
    seteditMode(data);
  };

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axiosInstance.get("/Reservation");
      setReservations(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        setReservations([]);
      }
      console.error("Failed to fetch reservations:", error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/User");
      setListUsers(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        setListUsers([]);
      }
      console.error("Failed to fetch users:", error.message);
    }
  };

  const formSubmitHandler = async () => {
    // return console.log("woe");
    const user = listUsers.find((u) => u.fullname == selectedUser);
    const room = listRooms.find((r) => r.name == selectedRoom);

    if (editMode != null) {
      const response = await axiosInstance.put(
        `/Reservation/${editMode.reservationId}`,
        {
          UserId: user.userId,
          RoomId: room.roomId,
          StartDate: startDate,
          EndDate: endDate,
        }
      );
    } else {
      const response = await axiosInstance.post("/Reservation", {
        UserId: user.userId,
        RoomId: room.roomId,
        StartDate: startDate,
        EndDate: endDate,
      });
    }

    fetchReservations();
    closeModal();
  };

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get("/Room");
      setListRooms(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        setListRooms([]);
      }
      console.error("Failed to fetch rooms:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
    fetchRooms();
    fetchReservations();
  }, []);

  const createReservations = async () => {};
  const updateReservation = async (id) => {
    await axiosInstance.put(`/Reservation/${id}`);
    fetchReservations();
  };
  const deleteReservation = async (id) => {
    console.log(id);
    await axiosInstance.delete(`/Reservation/${id}`);
    fetchReservations();
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Modal */}
      <div
        className={cn(
          "absolute w-screen h-screen flex justify-center items-center",
          { hidden: !showModal }
        )}
      >
        <div
          onClick={closeModal}
          className="cursor-pointer absolute z-10 bg-black opacity-60 w-screen h-screen"
        ></div>

        {/* Modal Data */}
        <div
          // onSubmit={() => formSubmitHandler($event)}
          className="w-[700px] p-10 rounded-xl bg-white z-20 relative flex flex-col justify-between gap-6"
        >
          <XCircle
            onClick={closeModal}
            className="absolute right-5 top-5 size-8 cursor-pointer"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">Modal Form</h1>
            {/* Dropdown */}
            <Select
              value={selectedUser}
              onValueChange={(val) =>
                setSelectedUser(
                  listUsers.find((v) => v.fullname == val).fullname
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a User" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Users</SelectLabel>
                  {listUsers.map((user) => (
                    <SelectItem
                      key={user.userId}
                      value={user.fullname}
                    >
                      {user.fullname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Dropdown Room */}
            <Select
              value={selectedRoom}
              onValueChange={(val) =>
                setSelectedRoom(listRooms.find((v) => v.name == val).name)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rooms</SelectLabel>
                  {listRooms.map((user) => (
                    <SelectItem
                      key={user.roomId}
                      value={user.name}
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <span className="text-sm">Start Date</span>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md border flex justify-center"
                />
              </div>
              <div className="">
                <span className="text-sm">End Date</span>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md border flex justify-center"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={formSubmitHandler}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </div>

      <header>
        {/* Navbar */}
        <nav className="h-28">
          <div className="flex items-center justify-between w-full h-full px-10 border-b gap-7 border-b-slate-200">
            {/* Airbnb logo */}
            <div className="flex items-center gap-6">
              {/* <img
                src={airbnbLogo}
                alt="airbnbLogo"
                className="w-32"
              /> */}
              <h1 className="text-lg font-semibold ">Admin Dashboard</h1>
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
                  to={"/"}
                  className={cn(
                    "w-full p-2 flex justify-center items-center gap-2 border-b cursor-pointer hover:bg-gray-100 rounded-t-xl"
                  )}
                >
                  <HomeIcon className="size-5" />
                  Home
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
      <main className="h-[88vh] grid grid-cols-[10vw_90vw] ">
        <div className="border-r flex flex-col p-4 gap-4">
          <Link
            to={`/admin/`}
            className="flex border rounded-xl p-2 bg-black text-white"
          >
            Reservation
          </Link>
          <Link
            to={`/admin/room`}
            className="flex border rounded-xl p-2 "
          >
            Room
          </Link>
          {/* <Link
            to={`/admin/payment`}
            className="flex border rounded-xl p-2 "
          >
            Payment
          </Link> */}
        </div>
        <div className="w-full h-full px-16 py-8 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold ">Reservation Data</h1>
            <div
              onClick={modalHandler}
              className="cursor-pointer border px-4 py-2 rounded-full hover:bg-black hover:text-white"
            >
              Add Data
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-collapse border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">
                    Reservation ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300">User ID</th>
                  <th className="px-4 py-2 border border-gray-300">Room ID</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Total Price
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Start Date
                  </th>
                  <th className="px-4 py-2 border border-gray-300">End Date</th>
                  {/* <th className="px-4 py-2 border border-gray-300">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.reservationId}>
                    <td className="px-4 py-2 border border-gray-300">
                      {reservation.reservationId}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {reservation.userId}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {reservation.roomId}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {reservation.totalPrice}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {new Date(reservation.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {new Date(reservation.endDate).toLocaleDateString()}
                    </td>
                    {/* <td className="px-4 py-2 border border-gray-300">
                      {reservation.status}
                    </td> */}
                    <td className="px-4 py-2 border border-gray-300 flex justify-around">
                      <div
                        onClick={() => updateModalHandler(reservation)}
                        className="border rounded-xl p-2 cursor-pointer bg-gray-400 hover:bg-gray-600 text-white"
                      >
                        <Pencil />
                      </div>
                      <div
                        onClick={() =>
                          deleteReservation(reservation.reservationId)
                        }
                        className="border rounded-xl p-2 cursor-pointer bg-red-500 hover:bg-red-700 text-white"
                      >
                        <Trash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
