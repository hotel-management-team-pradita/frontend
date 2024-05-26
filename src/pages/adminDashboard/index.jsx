import { profileIcon } from "../../assets/icons";
import { airbnbLogo } from "../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboardPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/Reservation"
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <header>
        {/* Navbar */}
        <nav className="h-28">
          <div className="flex items-center justify-between w-full h-full px-10 border-b gap-7 border-b-slate-200">
            {/* Airbnb logo */}
            <img src={airbnbLogo} alt="airbnbLogo" className="w-32" />

            {/* Account logo */}
            <div className="flex items-center justify-center p-1 border rounded-full size-12 border-slate-400">
              <img src={profileIcon} alt="profileIcon" />
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main>
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-4 text-3xl font-semibold">Admin Dashboard</h1>
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
                  <th className="px-4 py-2 border border-gray-300">Status</th>
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
                    <td className="px-4 py-2 border border-gray-300">
                      {reservation.status}
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
