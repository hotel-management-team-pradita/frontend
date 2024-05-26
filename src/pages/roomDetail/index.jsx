import { profileIcon } from "@/assets/icons";
import { airbnbLogo, hotelImg1 } from "@/assets/images";
import { format } from "date-fns";

const RoomDetailPage = () => {
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
            <div className="flex justify-between">
              {/* Room Description */}
              <div>
                <h1>Abiansemal, Indonesia</h1>
                <p>Hotel ini merupakan...</p>
                <p>Status: Kosong</p>
              </div>
              {/* Price */}
              <div className="border">
                <h1>{formatPrice(80000)}</h1>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomDetailPage;
