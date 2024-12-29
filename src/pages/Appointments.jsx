import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import userData from "../lib/userData";
import TimeAgo from "../components/TimeAgo";

const Appointments = () => {
  const [bookings, setBookings] = useState([]);

  const [user, setUser] = useRecoilState(userData);

  const getMyBookings = async () => {
    const q = query(
      collection(db, "bookings"),
      where("doctorId", "==", user?.email)
    );
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
    <div>
      <DashboardHeader label="Appointments" />

      <div className="p-4 md:p-10">
        {bookings.map((booking) => (
          <div className="flex flex-row gap-3 bg-white shadow-md p-4">
            <img className="w-[70px] h-[70px] rounded-full" alt="patient" src={ booking?.patient?.profilePic ? booking?.patient?.profilePic : "/man.jpg"} />
            <section>
              <h1 className="text-lg font-semibold">Name: {booking?.patient?.fullName}</h1>
              <p className="text-sm text-gray-500">Email: {booking?.patient?.email}</p>
              <p className="text-gray-500 italic">Submitted <TimeAgo timestamp={booking?.timestamp} /></p>
              <div className="flex flex-row gap-3 mt-3">
                 <button className="bg-brand text-white px-4 py-2 rounded-md">
                    Approve
                 </button>
                 <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Decline
                 </button>
              </div>
            </section>

                
          </div>




        ))}
      </div>
    </div>
  );
};

export default Appointments;
