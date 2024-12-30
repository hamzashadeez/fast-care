import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <div className="flex flex-row items-center h-[70px] border-b border-brand/20 shadow-md justify-between px-5 md:px-12">
      <img src="/logo.svg" alt="" className="w-32" />
      <nav className="md:flex flex-row gap-8 hidden">
        <Link to={"/"}>
          <p className="font-semibold text-sm md:text-lg hover:text-brand">Home</p>
        </Link>
        <Link to={"/"}>
          <p className="font-semibold text-sm md:text-lg hover:text-brand">Features</p>
        </Link>
        <Link to={"/"}>
          <p className="font-semibold text-sm md:text-lg hover:text-brand">How We Work</p>
        </Link>
        <Link to={"/"}>
          <p className="font-semibold text-sm md:text-lg hover:text-brand">Our Team</p>
        </Link>
      </nav>

      <Link to={"/login"}>
        <button className="bg-brand text-white px-5 py-2 hover:bg-teal-700 text-sm md:text-lg rounded-md">LOGIN</button>
      </Link>
    </div>
  );
};

export default Header;
