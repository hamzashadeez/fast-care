import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRecoilState } from "recoil";
import userData from "../lib/userData";

const Sidebar = () => {
  const [user, setUser] = useRecoilState(userData);


  return (
    <div>
      <img src="/logo.svg" alt="" className="w-3/4 mt-4" />
      <div className="mt-4 flex flex-col gap-8  pt-4 md:pt-16 md:px-5">
        <Link
          to={"/dashboard"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <MdDashboard size={30} color="gray" />
          <h3 className="text-xl hidden md:flex font-semibold">Dashboard</h3>
        </Link>
       {user?.userType === "patient" && <Link
          to={"/bookings"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoTime size={30} color="gray" />
          <h3 className="text-xl hidden md:flex font-semibold">Bookings</h3>
        </Link>}
       {user?.userType === "doctor" && <Link
          to={"/appointments"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoTime size={30} color="gray" />
          <h3 className="text-xl hidden md:flex font-semibold">Appointments</h3>
        </Link>}
        {/* <Link
          to={"/members"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <MdFamilyRestroom size={30} color="gray" />
          <h3 className="text-xl hidden md:flex font-semibold">My Family</h3>
        </Link> */}
        <Link
          to={"/chats"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoMdChatboxes size={30} color="gray" />
          <h3 className="text-xl hidden md:flex font-semibold">My Chats</h3>
        </Link>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-50 text-red-400 mt-8  hover:bg-red-400 hover:text-white px-4 py-2 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
