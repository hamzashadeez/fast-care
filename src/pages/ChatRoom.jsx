import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";

const ChatRoom = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const getRoomData = async () => {
    const q = query(collection(db, "bookings", String(id), "chats"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        list.push(doc.data());
      });
      // setChats(list);
    });
  };
  useEffect(() => {
    getRoomData();
  }, []);
  return (
    <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center bg-brand/5 ">
      <div className="bg-white flex items-center justify-between  p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3">
        <Link
          className="bg-brand/5 text-brand text-sm px-3 py-2 rounded"
          to="/chats"
        >
          Go Back
        </Link>
        <h1 className="text-center font-semibold  text-2xl text-brand">Chat</h1>
        <div className="text-white">dfdf</div>
      </div>

      <div className="
        bg-white mt-3 shadow-md  w-full md:w-1/2 mb-3 p-3 md:p-6 md:h-[600px] relative
      ">
        hmza
      </div>
    </div>
  );
};

export default ChatRoom;
