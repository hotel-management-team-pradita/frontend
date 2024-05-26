import { profileIcon } from "@/assets/icons";
import { airbnbLogo } from "@/assets/images";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        const response = await axios.get(
          `http://localhost:5173/api/Room/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  if (!room) {
    return <p>Loading...</p>;
  }

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

        <main className="w-full px-10">
          <div className="flex justify-between w-full overflow-hidden rounded-2xl">
            <div className="w-1/2">
              {/* Ini udah bener, cuma gambarnya aja ga muncul */}
              <img
                src={room.image}
                alt="hotelImg"
                className="object-cover w-full"
              />
              {/* Room Description */}
              <div>
                <h1 className="text-3xl font-bold">{room.location}</h1>{" "}
                <p>{room.description}</p> <p>Status: {room.status}</p>{" "}
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between w-full">
                {/* Price */}
                <div className="w-full px-10 py-10 border shadow-2xl rounded-2xl">
                  <h1 className="text-3xl font-bold">
                    {formatPrice(room.price)}{" "}
                    <span className="text-2xl font-normal">night</span>
                  </h1>
                  {/* Check in - Check out */}
                  <div className="flex flex-col items-center justify-center mt-8">
                    <label htmlFor="" className="text-2xl font-semibold">
                      Check in - Check out
                    </label>
                    {/* ... */}
                  </div>

                  {/* Reserve button */}
                  <button className="w-full h-10 mt-5 font-semibold text-white rounded-lg bg-pink">
                    Reserve
                  </button>

                  {/* Total price */}
                  <div className="flex justify-between mt-5 text-xl">
                    <span>{formatPrice(room.price)} x 5 nights</span>
                    <span>{formatPrice(room.price * 5)}</span>
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
