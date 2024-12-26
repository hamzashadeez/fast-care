import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MdAccountCircle } from "react-icons/md";
import { FaBell } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="">
      <header className="bg-white shadow-sm w-full h-[60px] flex items-center justify-between px-5 md:px-12">
        <h1 className="text-bold text-xl text-black">Dashboard</h1>
        <div className="flex gap-5">
          <Link to={"/"}>
            <div className="h-10 w-10 bg-red-500/10 flex items-center justify-center rounded-full">
              <FaBell size={25} color="red" />
            </div>
          </Link>
          <Link to={"/profile"}>
            <div className="h-10 w-10 bg-brand/10 flex items-center justify-center rounded-full">
              <MdAccountCircle size={30} color="seagreen" />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
