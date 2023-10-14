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
import { getLocalStorage } from "./utilities/SessionHelper";
import { loggedIn } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const user = getLocalStorage("user");
  // default base url
  axios.defaults.baseURL =
    "https://task-management-project.onrender.com/api/v1";

  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;

  // login parsistance checking
  useEffect(() => {
    if (user) {
      dispatch(loggedIn(user));
    }
  }, [dispatch, user]);

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
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
