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
import ChatWrapper from "./components/ChatWrapper";
import ProfileScreen from "./pages/Profile";
import NewAppointment from "./pages/NewAppointment";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}></Route>
          <Route path="/profile" element={<ProtectedRoutes><ProfileScreen /></ProtectedRoutes>}></Route>
          <Route path="/members" element={<ProtectedRoutes><Members /></ProtectedRoutes>}></Route>
          <Route path="/chats" element={<ChatWrapper><Chats /></ChatWrapper>}></Route>
          <Route path="/bookings" element={<ProtectedRoutes><Bookings /></ProtectedRoutes>}></Route>
          <Route path="/new-appointment" element={<NewAppointment />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



