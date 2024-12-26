import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Sidebar = () => {
  return (
    <div>
      <img src="/logo.svg" alt="" className="w-3/4 mt-4" />
      <div className="mt-4 flex flex-col gap-8  pt-4 md:pt-16 md:px-5">
        <Link
          to={"/chats"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <MdDashboard size={30} color="gray" />
          <h3 className="text-xl font-semibold">Dashboard</h3>
        </Link>
        <Link
          to={"/bookings"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoTime size={30} color="gray" />
          <h3 className="text-xl font-semibold">Bookings</h3>
        </Link>
        <Link
          to={"/members"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <MdFamilyRestroom size={30} color="gray" />
          <h3 className="text-xl font-semibold">My Family</h3>
        </Link>
        <Link
          to={"/chats"}
          className="flex gap-4 items-center hover:text-brand hover:font-bold "
        >
          <IoMdChatboxes size={30} color="gray" />
          <h3 className="text-xl font-semibold">My Chats</h3>
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
