import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function ProtectedRoutes({ children }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate  = useNavigate();

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
              console.log(doc.data());
              setUser(doc.data());
              setLoading(false);
              //   setUserState(doc.data());
            }
          );
          return;
        }
        if(!user) navigate("/login");
        setLoading(false);
        // setUser(authenticatedUser);
      }
    );
    return unsubscribeAuthStateChanged;
  }, []);

  if (loading) return <LoadingComponent />;


  return <div>{children}</div>;
}

export default ProtectedRoutes;
