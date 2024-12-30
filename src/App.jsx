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
import ProfileScreen from "./pages/Profile";
import NewAppointment from "./pages/NewAppointment";
import UpdateProfileDoc from "./pages/UpdateProfileDoc";
import UpdateProfile from "./pages/UpdateProfile";
import EmptyRouteProtector from "./components/EmptyRouteProtector";
import Appointments from "./pages/Appointments";
import ChatRoom from "./pages/ChatRoom";
import PatientChats from "./pages/PatientChat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <ProfileScreen />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/members"
            element={
              <ProtectedRoutes>
                <Members />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/chats"
            element={
              <ProtectedRoutes>
                <Chats />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/chats-patient"
            element={
              <ProtectedRoutes>
                <PatientChats />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/bookings"
            element={
              <ProtectedRoutes>
                <Bookings />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/update-profile-doctor"
            element={
              <EmptyRouteProtector>
                <UpdateProfileDoc />
              </EmptyRouteProtector>
            }
          ></Route>
          <Route
            path="/update-profile"
            element={
              <EmptyRouteProtector>
                <UpdateProfile />
              </EmptyRouteProtector>
            }
          ></Route>
          <Route
            path="/new-appointment"
            element={
              <EmptyRouteProtector>
                <NewAppointment />
              </EmptyRouteProtector>
            }
          ></Route>
          <Route
            path="/chat/:id"
            element={
              <EmptyRouteProtector>
                <ChatRoom />
              </EmptyRouteProtector>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
