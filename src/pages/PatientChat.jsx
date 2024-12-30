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

const PatientChats = () => {
  const [chats, setChats] = useState([]);
  const [user, _] = useRecoilState(userData);

  const getChattingUsers = async () => {
    // query all
    const qr = query(collection(db, "bookings"));

    const bookingsList = [];
    const unsubscribe = onSnapshot(qr, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          doc.data().id === user?.email &&
          doc.data().status === "approved"
        ) {
          // doctor

          bookingsList.push({
            docId: doc.id,
            chats: doc.data().doctor,
            ...doc.data(),
          });
          console.log(bookingsList);
          setChats(bookingsList);
        }

      });
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
          className="bg-white flex gap-5  p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3"
        >
          <img
            src={chat?.chats?.profilePic ? chat?.chats?.profilePic : "/man.jpg"}
            alt=""
            className="w-[50px] h-[50px] rounded-full border-2 mt-3 border-brand "
          />
          <div className="flex-1">
            <h1 className="font-semibold text-black text-lg uppercase">
              {chat?.sessionName}
            </h1>
            <h1 className="font-semibold text-brand capitalize">
              {chat?.chats?.fullName}
            </h1>
            <h1 className=" text-gray-400 uppercase italic">
              {chat?.chats?.userType}
            </h1>
          </div>
          <div className="mt-3 flex items-center justify-center ">
            <Link
              to={`/chat/${chat?.docId}`}
              className="bg-brand py-2 px-2.5 text-white rounded"
            >
              View Chat
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientChats;
