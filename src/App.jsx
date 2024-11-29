import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import VerifyUserLogin from "./auth/VerifyUserLogin";
import UserProfile from "./Components/UserProfile";
import ActivationSuccess from "./Components/AccountActivation";

function App() {
  return (
    <>
      <div className="container mt-5">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:token" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <VerifyUserLogin>
                <Dashboard />
              </VerifyUserLogin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user-profile"
            element={
              <VerifyUserLogin>
                <UserProfile />
              </VerifyUserLogin>
            }
          />
          <Route
            path="/activate"
            element={
              <VerifyUserLogin>
                <ActivationSuccess />
              </VerifyUserLogin>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
