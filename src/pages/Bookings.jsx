import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import userData from "../lib/userData";
import TimeAgo from "../components/TimeAgo";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [user, setUser] = useRecoilState(userData);

  const getMyBookings = async () => {
    const q = query(collection(db, "bookings"), where("id", "==", user?.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push(doc.data());
      });
      setBookings(bookingsList);
      console.log(bookingsList);
    });
  };

  useEffect(() => {
    getMyBookings();
  }, [user]);

  return (
    <div className="">
      <DashboardHeader label="Bookings" />
      <div className="p-6 md:p-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl text-brand">
            My Recent Appointments
          </h1>
          <Link
            className="bg-brand text-white px-5 py-1.5 rounded"
            to="/new-appointment"
          >
            New Appointment
          </Link>
        </div>
        {/* appointments */}
        <section className="w-full md:w-2/3 flex flex-col gap-3">
          {bookings.map((booking, index) => (
            <main key={index}>
              <div className="bg-white rounde-md p-4 md:p-6 shadow-md">
                <p className="text-gray-500 italic">{<TimeAgo timestamp={booking?.timestamp} />}</p>
                <p className="font-bold  text-sm md:text-lg">
                  <span className="font-normal text-black">Doctor:</span> Dr.{" "}
                  {booking?.doctor?.fullName}
                </p>
                <p className="font-bold  text-sm md:text-lg">
                  <span className="font-normal text-black">Speciality:</span>{" "}
                  Cardiologist
                </p>
                <p className=" text-sm md:text-lg capitalize">
                Status:
                  <span className={`font-bold ${booking?.status === "approved"? "text-brand": "text-black"} `}>
                  {" "}{booking?.status}</span>
                  
                </p>
              </div>
            </main>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Bookings;
