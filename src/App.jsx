import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



// useEffect(() => {
//   setLoading(true);
//   const unsubscribeAuthStateChanged = onAuthStateChanged(
//     auth,
//     async (authenticatedUser) => {
//       if (authenticatedUser) {
//         const unsub = onSnapshot(
//           doc(db, "users", authenticatedUser?.email),
//           (doc) => {
//             console.log(doc.data());
//             setUserState(doc.data());
//           }
//         );
//         setLoading(false);
//       }
//       setLoading(false);
//       setUser(authenticatedUser);
//     }
//   );
//   return unsubscribeAuthStateChanged;
// }, []);