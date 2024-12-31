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
import { IoVideocamOutline } from "react-icons/io5";
import CustomModal from "../components/CustomModal";

const ChatMessage = ({ message, userId, time, name, type }) => {
  const [user, _] = useRecoilState(userData);
  const link = "https://meet.google.com/kod-ccef-oii";

  return (
    <div
      className={`flex flex-col justify-between w-full gap-2 ${
        userId === user.email ? "items-end" : "items-start"
      } `}
    >
      <p className="text-xs -mt-2">{name === user?.fullName ? "Me" : name}</p>
      <div
        className={`
        ${userId === user.email ? "bg-brand/5" : "bg-blue-50"}
        p-3 max-w-[70%] rounded-md shadow-sm -mt-2
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
  const link = "https://meet.google.com/kod-ccef-oii";

  const [videoModal, setVideoModal] = useState(false);

  const getRoomData = async () => {
    const q = query(
      collection(db, "bookings", String(id), "chats"),
      orderBy("time", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        list.push(doc.data());
      });
      myDivRef.current.scrollTo(50, 0);
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
      name: user?.fullName,
    }).then(() => {
      myDivRef.current.scrollTo(50, 0);
      setMessage("");
    });
  };

  const sendInvite = async () => {
    const q = query(collection(db, "bookings", String(id), "chats"));
    await addDoc(q, {
      type: "link",
      userId: user?.email,
      time: Timestamp.now(),
      name: user?.fullName,
    }).then(() => {
      myDivRef.current.scrollTo(50, 0);
      setVideoModal(false);
      setMessage("");
    });
  };
  return (
    <div className="min-h-screen pt-12 px-6 md:px-16 flex flex-col items-center bg-brand/5 ">
      <div className="bg-white flex items-center justify-between  p-3 md:p-6 rounded-md shadow-md w-full lg:w-1/2 mb-3">
        <Link
          className="bg-brand/5 text-brand text-sm px-3 py-2 rounded"
          to={`${user?.userType === "patient" ? "/chats-patient" : "/chats"}`}
        >
          Go Back
        </Link>
        <h1 className="text-center font-semibold  text-2xl text-brand">Chat</h1>
        {user?.userType === "doctor" ? (
          <button
            onClick={() => setVideoModal(!videoModal)}
            className="bg-brand/5 text-brand text-sm px-3 py-2 rounded"
          >
            <IoVideocamOutline size={20} />
          </button>
        ) : (
          <div className="w-4"></div>
        )}
      </div>

      <div
        ref={myDivRef}
        className="
        bg-white mt-3 shadow-md  w-full lg:w-1/2 mb-1 overflow-y-auto h-[75vh]  lg:h-[70vh] 
      "
      >
        <div
          className="
          p-3 md:p-6
          flex flex-col gap-8 h-[90%] relative
        "
        >
          <p className="text-center uppercase text-gray-400">
            Medical Conversation
          </p>
          {chats.map((item, index) => {
            if (item.type === "link") {
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between w-full gap-2 ${
                    item === user.email ? "items-end" : "items-start"
                  } `}
                >
                  <button
                    onClick={() => window.open(link, "_blank")}
                    className="flex items-center bg-white shadow-sm p-2 gap-3"
                  >
                    <IoVideocamOutline size={25} className="text-brand" />
                    <p className="text-brand font-semibold">Join Call</p>
                  </button>
                </div>
              );
            } else {
              return (
                <ChatMessage
                  key={index}
                  userId={item.userId}
                  message={item.message}
                  name={item.name}
                  time={item.time}
                />
              );
            }
          })}
        </div>
        <img
          src="/logo1.svg"
          className="absolute top-[50%] left-[50%] opacity-10 w-1/5 translate-x-[-50%] translate-y-[-50%]"
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => submitMessage(e)}
        className="flex items-center gap-3 bg-white px-3 md:px-6 w-full py-2 w-full lg:w-1/2 "
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
      <CustomModal isOpen={videoModal} onClose={setVideoModal}>
        <div className="w-[350px] h-[350px] gap-5 shadow-md bg-brand/5 flex-col flex items-center justify-center">
          <img src="/logo1.svg" alt="" className="opacity-25" />
          <h1 className="text-3xl text-brand text-center">
            Send Video Call<br></br>Invite
          </h1>
          <div className="flex gap-3 items-center">
            <Button onClick={() => sendInvite()} label="Send" />
            <button
              className="bg-red-500 hover:bg-red-700 mt-3 text-white font-semibold h-[45px] w-full px-4 rounded-md"
              onClick={() => setVideoModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ChatRoom;
