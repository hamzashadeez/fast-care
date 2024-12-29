import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import userData from "../lib/userData";
import TimeAgo from "../components/TimeAgo";
import LoadingComponent from "../components/LoadingComponent";
import CustomModal from "../components/CustomModal";
import Button from "../components/Button";

const Appointments = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, _] = useRecoilState(userData);

  const Approve = async (id) => {
    setLoading(true);
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status: "approved" })
      .then(() => {
        setLoading(false);
        setIsModalOpen(true);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  const Decline = async (id) => {
    setLoading(true);
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status: "declined" })
      .then(() => {
        setLoading(false);
        alert("Declined");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  const getMyBookings = async () => {
    const q = query(
      collection(db, "bookings"),
      where("doctorId", "==", user?.email),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push({ docId: doc.id, ...doc.data() });
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
      {loading && <LoadingComponent />}
      <div className="p-4 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-3">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 bg-white shadow-md p-4"
          >
            <img
              className="w-[70px] h-[70px] rounded-full"
              alt="patient"
              src={
                booking?.patient?.profilePic
                  ? booking?.patient?.profilePic
                  : "/man.jpg"
              }
            />
            <section>
              <h1 className="text-lg font-semibold">
                Name: {booking?.patient?.fullName}
              </h1>
              <p className="text-sm text-gray-500">
                Email: {booking?.patient?.email}
              </p>
              <p className="text-gray-500 italic">
                Submitted <TimeAgo timestamp={booking?.timestamp} />
              </p>
              {booking?.status === "pending" && (
                <div className="flex flex-row gap-3 mt-3">
                  <button
                    onClick={() => Approve(booking?.docId)}
                    className="bg-brand text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => Decline(booking?.docId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Decline
                  </button>
                </div>
              )}

              {booking?.status === "approved" && (
                <div className="mt-3 bg-brand/20 text-brand py-2 rounded-md font-semibold text-sm text-center">
                  Approved
                </div>
              )}
              {booking?.status === "declined" && (
                <div className="mt-3 bg-red-500/20 text-red-500 py-2 rounded-md font-semibold text-sm text-center">
                  Declined
                </div>
              )}
            </section>
          </div>
        ))}
      </div>
        <CustomModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
          <div className="w-[300px] h-[300px] bg-brand/5 p-4 flex flex-col items-center justify-center relative">
            <img src="/logo1.svg" alt="" className="mx-auto mb-3" />
            <h1 className="text-2xl text-brand font-semibold text-center mb-3">Appointment Approved Successfully</h1>
            <Button label="Close" onClick={() => setIsModalOpen(false)} />
          </div>
        </CustomModal>
    </div>
  );
};

export default Appointments;
