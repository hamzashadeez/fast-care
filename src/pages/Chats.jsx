import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import userData from "../lib/userData";
import { Link } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [user, _] = useRecoilState(userData);

  const getChattingUsers = async () => {
    const q = query(
      collection(db, "bookings"),
      where("doctorId", "==", user?.email),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsList = [];
      querySnapshot.forEach((doc) => {
        const data =
          user.email === doc.data().doctorId
            ? doc.data().patient
            : doc.data().doctor;
        bookingsList.push({ docId: doc.id, data, ...doc.data() });
      });
      setChats(bookingsList);
      console.log(bookingsList);
    });
  };

  useEffect(() => {
    getChattingUsers();
  }, []);

  return (
    <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center  ">
      <div className="bg-white p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3">
        <h1 className="text-center font-semibold text-2xl text-brand">
          My Chats
        </h1>
      </div>

      {chats.map((chat, index) => (
        <div
          key={index}
          className="bg-white flex gap-4  p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3"
        >
          <img
            src={chat?.profilePic ? chat?.profilePic : "/man.jpg"}
            alt=""
            className="w-[50px] h-[50px] rounded-full border-2 border-brand "
          />
          <div className="flex-1">
            <h1 className="font-semibold text-brand">{chat?.data?.fullName}</h1>
            <h1 className="font-semibold text-gray-500 uppercase italic">
              {chat?.data?.userType}
            </h1>
          </div>
          <div className="mt-3 flex items-center justify-center ">
            <Link to={`/chat/${chat?.docId}`} className="bg-brand py-2 px-2.5 text-white rounded">
              View Chat
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
