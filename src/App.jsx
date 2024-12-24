import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Members from "./pages/Members";
import Chats from "./pages/Chats";
import Bookings from "./pages/Bookings";
import ProtectedRoutes from "./components/ProtextedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}></Route>
          <Route path="/members" element={<ProtectedRoutes><Members /></ProtectedRoutes>}></Route>
          <Route path="/chats" element={<ProtectedRoutes><Chats /></ProtectedRoutes>}></Route>
          <Route path="/bookings" element={<ProtectedRoutes><Bookings /></ProtectedRoutes>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



