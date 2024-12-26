import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const Bookings = () => {
  return (
    <div className="">
      <DashboardHeader label="Bookings" />
      <div className="p-6 md:p-12">
        <div className="flex items-center justify-between mb-4">
          <h1 class name="font-semibold text-2xl text-brand">My Recent Appointments</h1>
          <Link className="bg-brand text-white px-5 py-1.5 rounded" to="/new-appointment">New Appointment</Link>
        </div>
        {/* appointments */}
        <section className="w-full md:w-2/3 flex flex-col gap-3">
          <div className="bg-white rounde-md p-4 md:p-6 shadow-md">
            <p className="text-gray-500 italic">Just Now</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Doctor:</span> Dr. John Doe</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Speciality:</span> Cardiologist</p>
            <p className="font-bold text-brand text-sm md:text-lg"><span className="font-normal text-black">Status:</span> Approved</p>
          </div>
          <div className="bg-white rounde-md p-4 md:p-6 shadow-md">
            <p className="text-gray-500 italic">Just Now</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Doctor:</span> Dr. John Doe</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Speciality:</span> Cardiologist</p>
            <p className="font-bold text-brand text-sm md:text-lg"><span className="font-normal text-black">Status:</span> Approved</p>
          </div>
          <div className="bg-white rounde-md p-4 md:p-6 shadow-md">
            <p className="text-gray-500 italic">Just Now</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Doctor:</span> Dr. John Doe</p>
            <p className="font-bold  text-sm md:text-lg"><span className="font-normal text-black">Speciality:</span> Cardiologist</p>
            <p className="font-bold text-red-500 text-sm md:text-lg"><span className="font-normal text-black">Status:</span> Rejected</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bookings;
