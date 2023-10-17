import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Main from "./layout/Main";
import NoPage from "./pages/NoPage";
import Home from "./components/Dashboard/Home";
import Create from "./components/Dashboard/Create";
import New from "./components/Dashboard/New";
import Progress from "./components/Dashboard/Progress";
import Completed from "./components/Dashboard/Completed";
import Canceled from "./components/Dashboard/Canceled";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import SendOTP from "./pages/SendOTP";
import VerifyOTP from "./pages/VerifyOTP";
import PasswordRecovery from "./pages/PasswordRecovery";
import useAuthCheck from "./hooks/useAuthCheck";
import { useEffect } from "react";
import { getLocalStorage } from "./utilities/SessionHelper";

function App() {
  const [data, setData] = useAuthCheck();
  const { user } = useSelector((state) => state.auth);
  const userinfo = getLocalStorage("user");

  // default base url
  axios.defaults.baseURL =
    "https://task-management-project.onrender.com/api/v1";

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    data?.token ?? userinfo?.token
  }`;

  useEffect(() => {
    setData(user);
  }, [user, setData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="new" element={<New />} />
          <Route path="progress" element={<Progress />} />
          <Route path="completed" element={<Completed />} />
          <Route path="canceled" element={<Canceled />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendOtp" element={<SendOTP />} />
        <Route path="/verifyOtp" element={<VerifyOTP />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
