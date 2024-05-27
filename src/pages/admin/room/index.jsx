import { profileIcon, settingIcon, logoutIcon } from "@/assets/icons";
import { airbnbLogo } from "@/assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
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

const AdminRoomPage = () => {
  const navigate = useNavigate();
  const [profileClicked, setProfileClicked] = useState(true);
  const authUser = fetchUser();

  // Data
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: 0,
    quantity: 1,
  });

  const [editMode, seteditMode] = useState();

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({});

  const closeModal = () => {
    setShowModal(false);
    seteditMode(null);
  };

  const modalHandler = () => {
    setShowModal(true);
  };

  const updateModalHandler = (data) => {
    setShowModal(true);
    setFormData({
      name: data.name,
      description: data.description,
      location: data.location,
      price: data.price,
      quantity: data.quantity,
    });
    seteditMode(data);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log(data);

    if (editMode != null) {
      await axiosInstance.put(`/Room/${editMode.roomId}`, {
        ...data,
        Image: data.Image ?? null,
        RoomTypeId: 1,
      });
    } else {
      await axiosInstance.post("/Room", {
        ...data,
        RoomTypeId: 1,
      });
    }

    fetchRooms();
    closeModal();
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // fetchUsers();
    fetchRooms();
  }, []);

  const deleteRoom = async (id) => {
    console.log(id);
    await axiosInstance.delete(`/Room/${id}`);
    fetchRooms();
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
        <form
          onSubmit={($event) => formSubmitHandler($event)}
          // onSubmit={() => formSubmitHandler($event)}
          className="w-[700px] p-10 rounded-xl bg-white z-20 relative flex flex-col justify-between gap-6"
        >
          <XCircle
            onClick={closeModal}
            className="absolute right-5 top-5 size-8 cursor-pointer"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">Modal Form</h1>
            <Input
              type="text"
              name="Name"
              placeholder="Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
            <Input
              type="text"
              name="Description"
              placeholder="Description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />

            <Input
              type="text"
              name="Location"
              placeholder="Location"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              value={formData.location}
            />

            <Input
              type="number"
              name="Price"
              placeholder="Price per Night"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              value={formData.price}
            />
            <Input
              min="1"
              type="number"
              name="Quantity"
              placeholder="Quantity"
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              value={formData.quantity}
            />
            <Input
              type="file"
              name="Image"
              placeholder="Pick an Image"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </form>
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
            className="flex border rounded-xl p-2 "
          >
            Reservation
          </Link>
          <Link
            to={`/admin/room`}
            className="flex border rounded-xl p-2 bg-black text-white"
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
            <h1 className="text-lg font-semibold ">Room Data</h1>
            <div
              onClick={modalHandler}
              className="cursor-pointer border px-4 py-2 rounded-full hover:bg-black hover:text-white"
            >
              Add Data
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="w-full border border-collapse border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Room ID</th>
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Location</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Description
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Price per Night
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Quantity</th>
                  <th
                    className="px-4 py-2 border border-gray-300"
                    width="20%"
                  >
                    Image
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.roomId}>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.roomId}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.location}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.description}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.price}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.quantity}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <img
                        src={room.image}
                        alt=""
                        className="h-[200px] w-[200px]"
                      />
                    </td>
                    <td
                      className="px-4 py-2  flex items-center justify-around "
                      height={240}
                    >
                      <div
                        onClick={() => updateModalHandler(room)}
                        className="border rounded-xl p-2 cursor-pointer bg-gray-400 hover:bg-gray-600 text-white"
                      >
                        <Pencil />
                      </div>
                      <div
                        onClick={() => deleteRoom(room.roomId)}
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

export default AdminRoomPage;
