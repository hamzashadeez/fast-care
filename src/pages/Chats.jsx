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
  
const Chats = () => {
    const [chats, setChats] = useState([]);
    const [user, _] = useRecoilState(userData);

    const getChattingUsers = async ()=>{
        const q = query(
            collection(db, "bookings"),
            where("doctorId", "==", user?.email),
            orderBy("timestamp", "desc")
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const bookingsList = [];
            querySnapshot.forEach((doc) => {
              bookingsList.push({ docId: doc.id, ...doc.data() });
            });
            setChats(bookingsList);
            console.log(bookingsList);
          });
    }

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
      
      {chats.map((chat, index) => <div key={index} className="bg-white p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3">
        <img src={chat?.profilePic ? chat?.profilePic : "/man.jpg"} alt="" className="w-[50px] h-[50px] rounded-full border-2 border-brand " />
      </div>
      )}
    </div>
  );
};

export default Chats;
