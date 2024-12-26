import { useRecoilState } from "recoil";
import userData from "../lib/userData";

const ProfileScreen = () =>{

  const [user, setUser] = useRecoilState(userData);

  

    return (
        <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center ">
            <div className="bg-white p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2">
                <h1 className="text-center font-semibold text-2xl text-brand">Profile</h1>
                <div className="flex gap-3 mt-3">
                    <img src="/doctor.jpeg" alt="" className="w-[50px] h-[50px] rounded-full border-2 border-brand " />
                <div className="">
                    <h1 className="font-semibold ">{user?.fullName}</h1>
                    <p className="font-normal text-sm text-gray-500 italic">{user?.userType}</p>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProfileScreen
