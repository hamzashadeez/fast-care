import { useRecoilState } from "recoil";
import userData from "../lib/userData";

const ProfileDetailsDoc = () => {
    const [user, _] = useRecoilState(userData);
    return (
        <div className="bg-white flex flex-col gap-6 p-3">
            <div className="grid grid-cols-4">
                <p>Speciality:</p>
                <p className="font-semibold col-span-3">{user?.speciality}</p>
            </div>
            <div className="grid grid-cols-4">
                <p>Email:</p>
                <p className="font-semibold col-span-3">{user?.email}</p>
            </div>
            <div className="grid grid-cols-4">
                <p>Rate:</p>
                <p className="font-semibold col-span-3">₦{user?.rate}.00</p>
            </div>
            <div className="grid grid-cols-4">
                <p>Bio:</p>
                <p className="font-semibold col-span-3 ">{user?.bio}</p>
            </div>
        </div>
    )
}


export default ProfileDetailsDoc;