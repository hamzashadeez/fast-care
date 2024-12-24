import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { IoTime } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div>
      <img src="/logo.svg" alt="" className="w-3/4 mt-4" />
      <div className="mt-4 flex flex-col gap-8 mt-16 md:px-5">
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
      </div>
    </div>
  );
};

export default Sidebar;
