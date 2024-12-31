import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MdAccountCircle } from "react-icons/md";
import { FaBell, FaRegCalendarTimes } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import userData from "../lib/userData";
import { TbCurrencyNaira } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { GrSchedules } from "react-icons/gr";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userData);
  const [value, onChange] = useState(new Date());

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rejected, setRejected] = useState([]);

  const getApprovedBookings = async () => {
    const q = query(collection(db, "bookings"), where("status", "==", "approved"));
    onSnapshot(q, (querySnapshot) => {
      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data());
      });
      setBookings(bookings);
    });
  };

  useEffect(() => {
    getApprovedBookings();
  }, []);




  const getUsers = async () => {
    const q = query(collection(db, "users"), where("userType", "==", "patient"));
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      console.log(users);
      setUsers(users);
    });
  };

  useEffect(() => {
    getUsers();
  },[])

  const getRejectedBookings = async () => {
    const q = query(collection(db, "bookings"), where("status", "==", "declined"));
    onSnapshot(q, (querySnapshot) => {
      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data());
      });
      setRejected(bookings);
    });
  };

  return (
    <div className="">
      <DashboardHeader label="Dashboard" />
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">
            Hello <span className="text-brand">{user?.fullName}</span>
          </h2>
          {user?.profilePic === null && (
            <Link
              to={
                user?.userType === "doctor"
                  ? "/update-profile-doctor"
                  : "/update-profile"
              }
              className="text-red-600 bg-red-100 px-4 py-2 font-semibold"
            >
              Update Your Profile
            </Link>
          )}
        </div>

        {/* section doctor */}
        {user?.userType === "doctor" && (
          <section className="grid grid-cols-1 mt-5  md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 ">

            <div className="bg-white border border-blue-600 p-6 gap-3 rounded-md shadow-md w-full flex items-center justify-start">
              <div className="h-12 w-12 text-blue-600 rounded-full bg-blue-600/10 flex items-center justify-center">
                <GrSchedules size={25} />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Approved Appointments</p>
                <h1 className="font-semibold text-2xl md:text-4xl text-blue-600">
                  {bookings.length}
                </h1>
              </div>
            </div>
            <div className="bg-white border border-orange-600 p-6 gap-3 rounded-md shadow-md w-full flex items-center justify-start">
              <div className="h-12 w-12 text-orange-600 rounded-full bg-orange-600/10 flex items-center justify-center">
                <FaRegCalendarTimes size={30} />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Rejected Appointments</p>
                <h1 className="font-semibold text-2xl md:text-4xl text-orange-600">
                  {rejected.length}
                </h1>
              </div>
            </div>
            <div className="bg-white border border-brand p-6 gap-3 rounded-md shadow-md w-full flex items-center justify-start">
              <div className="h-12 w-12 text-brand rounded-full bg-brand/10 flex items-center justify-center">
                <TbCurrencyNaira size={30} />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Amount Paid</p>
                <h1 className="font-semibold text-2xl md:text-4xl text-brand">
                  ₦0.00
                </h1>
              </div>
            </div>
            <div className="bg-white border border-blue-600 p-6 gap-3 rounded-md shadow-md w-full flex items-center justify-start">
              <div className="h-12 w-12 text-blue-600 rounded-full bg-blue-600/10 flex items-center justify-center">
                <GrSchedules size={25} />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Total Patients</p>
                <h1 className="font-semibold text-2xl md:text-4xl text-blue-600">
                  {users.length}
                </h1>
              </div>
            </div>
          </section>
        )}

        <main className="grid grid-cols-1 mt-5  lg:grid-cols-3 gap-3 md:gap-5">
          <div className="shadow-md border border-teal-700 overflow-hidden rounded-md">
            <img src="/tips.png" className="w-full" alt="" />
          </div>
          <div className="bg-white shadow-md p-3  rounded-md py-12 border border-brand">
          <Calendar onChange={onChange} value={value} />

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
