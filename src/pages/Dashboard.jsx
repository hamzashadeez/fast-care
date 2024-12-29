import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MdAccountCircle } from "react-icons/md";
import { FaBell, FaRegCalendarTimes } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import userData from "../lib/userData";
import { TbCurrencyNaira } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { GrSchedules } from "react-icons/gr";

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userData);

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
          <section className="grid grid-cols-1 mt-5  md:grid-cols-3 gap-3 md:gap-5 ">

            <div className="bg-white border border-blue-600 p-6 gap-3 rounded-md shadow-md w-full flex items-center justify-start">
              <div className="h-12 w-12 text-blue-600 rounded-full bg-blue-600/10 flex items-center justify-center">
                <GrSchedules size={25} />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Approved Appointments</p>
                <h1 className="font-semibold text-2xl md:text-4xl text-blue-600">
                  05
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
                  0
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
                  ₦50,000
                </h1>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
