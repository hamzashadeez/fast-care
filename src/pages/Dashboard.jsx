import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MdAccountCircle } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import userData from "../lib/userData";
import { useRecoilState } from "recoil";

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userData);

  return (
    <div className="">
      <DashboardHeader label="Dashboard" />
      <div className="p-6 md:p-8">
        <h2 className="font-semibold text-2xl">Hello <span className="text-brand">{user?.fullName}</span></h2>

        {/* section */}
        <section className="grid grid-cols-1 mt-5  md:grid-cols-3 gap-3 md:gap-5 ">
          <div className="bg-white p-6 rounded-md shadow-md w-full ">
            
          </div>
          <div className="bg-white p-6 rounded-md shadow-md w-full ">
            
          </div>
          <div className="bg-white p-6 rounded-md shadow-md w-full ">
            
          </div>
          <div className="bg-white p-6 rounded-md shadow-md w-full ">
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
