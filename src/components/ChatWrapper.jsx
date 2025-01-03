import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Sidebar from "./Sidebar";
import ChatSidebar from "./ChatSidebar";

function ChatWrapper({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          console.log(authenticatedUser);
          const unsub = onSnapshot(
            doc(db, "users", authenticatedUser?.email),
            (doc) => {
                setLoading(false);
              console.log(doc.data());
              setUser(doc.data());
              //   setUserState(doc.data());
            }
          );
          return;
        }
        if (!user) navigate("/login");
        setLoading(false);
        // setUser(authenticatedUser);
      }
    );
    return unsubscribeAuthStateChanged;
  }, []);

//   if (loading) return <LoadingComponent />;

  return (
    <div className="bg-brand/10 min-h-screen flex flex-row">
      <div className="w-1/6 p-4 shadow-sm bg-white">
        <ChatSidebar />
      </div>
      <div className="w-5/6">{children}</div>
    </div>
  );
}

export default ChatWrapper;
