import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRecoilState } from "recoil";
import { MdLogout } from "react-icons/md";
import userData from "../lib/userData";

const Sidebar = () => {
  const [user, setUser] = useRecoilState(userData);

  return (
    <div className="">
      <img src="/logo.svg" alt="" className="hidden lg:block w-3/4 mt-4" />
      <img
        src="/logo1.svg"
        alt=""
        className="w-[50px] mx-auto lg:hidden mt-4"
      />
      <div className="mt-4 flex flex-col items-center md:items-start gap-8  pt-4 md:pt-16 md:px-5">
        <Link
          to={"/dashboard"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <MdDashboard size={30} />
          <h3 className="text-xl hidden lg:flex font-semibold">Dashboard</h3>
        </Link>
        {user?.userType === "patient" && (
          <Link
            to={"/bookings"}
            className="flex gap-4 items-center hover:text-brand hover:font-bold "
          >
            <IoTime size={30} />
            <h3 className="text-xl hidden lg:flex font-semibold">Bookings</h3>
          </Link>
        )}
        {user?.userType === "doctor" && (
          <Link
            to={"/appointments"}
            className="flex gap-4 items-center hover:text-brand hover:font-bold "
          >
            <IoTime size={30} />
            <h3 className="text-xl hidden lg:flex font-semibold">
              Appointments
            </h3>
          </Link>
        )}
        <Link
          to={`${user?.userType === "doctor" ? "/chats" : "/chats-patient"}`}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoMdChatboxes size={30} />
          <h3 className="text-xl hidden lg:flex font-semibold">My Chats</h3>
        </Link>

        <button
          onClick={() => signOut(auth)}
          className="bg-white text-red-400 mt-16  hover:bg-red-400 hover:text-white w-[50px] md:w-full h-[50px] justify-center md:justify-start md:px-1 -mr-4 rounded-md flex gap-4 items-center"
        >
          <MdLogout size={25} />
          <h3 className="text-xl hidden lg:flex font-semibold text-center">
            Logout
          </h3>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
