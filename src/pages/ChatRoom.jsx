import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import Button from "../components/Button";
import userData from "../lib/userData";
import { useRecoilState } from "recoil";
import TimeAgo from "../components/TimeAgo";

const ChatMessage = ({ message, userId, time }) => {
  const [user, _] = useRecoilState(userData);

  return (
    <div
      className={`flex flex-col justify-between w-full gap-2 ${
        userId === user.email ? "items-end" : "items-start"
      } `}
    >
      <div
        className={`
        ${userId === user.email ? "bg-brand/5" : "bg-blue-50"}
        p-3 max-w-[70%] rounded-md shadow-sm
        `}
      >
        <p className="">{message}</p>
      </div>
      <p
        className={`
      ${userId === user.email ? "text-left" : "text-left"}
      text-xs text-gray-400 -mt-1`}
      >
        <TimeAgo timestamp={time} />
      </p>
    </div>
  );
};

const ChatRoom = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { id } = useParams();
  const [user, _] = useRecoilState(userData);
  const myDivRef = useRef(null);


  const getRoomData = async () => {
    const q = query(collection(db, "bookings", String(id), "chats"), orderBy("time", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        list.push(doc.data());
      });
      myDivRef.current.scrollTo(50, 0)
      setChats(list);
    });
  };
  useEffect(() => {
    getRoomData();
  }, []);

  const submitMessage = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "bookings", String(id), "chats"));
    await addDoc(q, {
      userId: user?.email,
      message,
      time: Timestamp.now(),
    }).then(() => {
      myDivRef.current.scrollTo(50, 0)
      setMessage("");
    });
  };
  return (
    <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center bg-brand/5 ">
      <div className="bg-white flex items-center justify-between  p-3 md:p-6 rounded-md shadow-md w-full md:w-1/2 mb-3">
        <Link
          className="bg-brand/5 text-brand text-sm px-3 py-2 rounded"
          to={`${user?.userType === "patient" ? "/chats-patient" : "/chats"}`}
        >
          Go Back
        </Link>
        <h1 className="text-center font-semibold  text-2xl text-brand">Chat</h1>
        <div className="text-white">dfdf</div>
      </div>

      <div
        ref={myDivRef}
        className="
        bg-white mt-3 shadow-md  w-full md:w-1/2 mb-1 overflow-y-auto h-[75vh]  lg:h-[70vh] 
      "
      >
        <div
          className="
          p-3 md:p-6
          flex flex-col gap-5 h-[90%] relative
        "
        >
          {chats.map((item, index) => (
            <ChatMessage
              key={index}
              userId={item.userId}
              message={item.message}
              time={item.time}
            />
          ))}
        </div>
        <img
          src="/logo1.svg"
          className="absolute top-[50%] left-[50%] opacity-10 w-1/5 translate-x-[-50%] translate-y-[-50%]"
          alt=""
        />
      </div>
          <form
            onSubmit={(e) => submitMessage(e)}
            className="flex items-center gap-3 bg-white px-3 md:px-6 w-full py-2 w-full md:w-1/2 "
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full h-[45px] rounded-md mt-2 border border-brand/20 px-2 outline-green-500  ring-1 ring-brand/20 focus:outline-brand"
              placeholder="Enter Message"
            />
            <Button label="Send" />
          </form>

    </div>
  );
};

export default ChatRoom;
