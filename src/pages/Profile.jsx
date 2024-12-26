import { useRecoilState } from "recoil";
import userData from "../lib/userData";
import { FaPlus } from "react-icons/fa6";

const ProfileScreen = () => {
  const [user, setUser] = useRecoilState(userData);

  return (
    <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center ">
      <div className="bg-white p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2">
        <h1 className="text-center font-semibold text-2xl text-brand">
          Profile
        </h1>
        <div className="flex gap-3 mt-3">
          <img
            src="/doctor.jpeg"
            alt=""
            className="w-[50px] h-[50px] rounded-full border-2 border-brand "
          />
          <div className="">
            <h1 className="font-semibold ">{user?.fullName}</h1>
            <p className="font-normal text-sm text-gray-500 italic">
              {user?.userType}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 mt-4 md:p-6 rounded-md shadow-md w-full md:w-1/2">
        <div className="relative">
          <h1 className="text-center font-semibold text-2xl text-brand">
            Family Members
          </h1>
          <button className="w-[40px] hover:bg-brand/50 h-[40px] rounded-full border border-gray-400 flex items-center justify-center absolute top-0 right-0">
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-6">
         <div className="bg-brand/5 p-3 rounded-md h-[50px]">
            <p className="font-semibold">Muhammad Kabir Usman</p>
         </div>
         <div className="bg-brand/5 p-3 rounded-md h-[50px]">
            <p className="font-semibold">Yasir Kabir</p>
         </div>
         <div className="bg-brand/5 p-3 rounded-md h-[50px]">
            <p className="font-semibold">Kabir Usman</p>
         </div>
         <div className="bg-brand/5 p-3 rounded-md h-[50px]">
            <p className="font-semibold">Usman Lawal</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
