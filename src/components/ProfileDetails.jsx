import { useRecoilState } from "recoil";
import userData from "../lib/userData";

const ProfileDetails = () => {
    const [user, _] = useRecoilState(userData);
    return (
        <div className="bg-white flex flex-col gap-6 p-3">
           
            <div className="grid grid-cols-4">
                <p>Email:</p>
                <p className="font-semibold col-span-3">{user?.email}</p>
            </div>
            
        </div>
    )
}


export default ProfileDetails;