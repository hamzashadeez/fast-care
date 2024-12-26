import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const ChatUser = ()=>{
    return (
        <Link to={"#"}>
            <div className="flex items-center gap-3 h-[70px] rounded-md pr-3 hover:bg-brand/5">
                <img src="/doctor.jpeg" alt="" className="w-[40px] h-[40px] rounded-sm " />
                <div className="flex flex-col">
                    <p className="font-semibold text-sm">John Doe</p>
                    <p className="font-semibold text-xs text-gray-400">Doctor</p>
                </div>
            </div>
        </Link>
    )
}



const ChatSidebar = () => {
    const [chatUsers, setChatUsers] = useState([]);

    const getChattingUsers = async ()=>{
         
    }
  return (
    <div className="h-screen overflow-y-auto">
      <p className="text-brand font-semibold text-lg ">Chats</p>
      <div className="flex items-center gap-2 my-2 h-[50px] border-b border-brand/20">
        <CiSearch color="gray" size={25} />
        <input className="flex-1 outline-none text-gray-600" type="text" placeholder="search chats" />
      </div>
      <div>
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        
      </div>
    </div>
  );
};

export default ChatSidebar;
