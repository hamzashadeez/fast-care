import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import userData from "../lib/userData";
import { useRecoilState } from "recoil";

function EmptyRouteProtector({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [_, setUserData] = useRecoilState(userData);

  useEffect(() => {
    setLoading(true);
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          const unsub = onSnapshot(
            doc(db, "users", authenticatedUser?.email),
            (doc) => {
              setLoading(false);
              setUser(doc.data());
              setUserData(doc.data());
            }
          );
          return;
        }
        if (!user) navigate("/login");
        setLoading(false);
      }
    );
    return unsubscribeAuthStateChanged;
  }, []);


  return (
    <div className=" min-h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default EmptyRouteProtector;
