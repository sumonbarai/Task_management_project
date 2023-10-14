import { GoPeople } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../redux/features/auth/authSlice";
import { successNotification } from "../utilities/NotificationHelper";
import { removeLocalStorage } from "../utilities/SessionHelper";
import defaultAvata from "../assets/images/default_avata.png";

const NavBar = ({ handleShow }) => {
  const { user } = useSelector((state) => state.auth);
  const { fistName, lastName, photo } = user?.data || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggedOut());
    navigate("/login");
    successNotification("logout successfully");
    removeLocalStorage("user");
  };

  return (
    <nav className="navbar  shadow">
      <div className="container-fluid px-4">
        <Link to="/" className="navbar-brand fs-4 fw-medium font-monospace">
          <span
            style={{ color: "#D980FA" }}
            className="pe-2"
            onClick={handleShow}
            role="button"
          >
            <FaTasks />
          </span>
          Task Manager
        </Link>
        <div className="dropdown">
          <img
            width={40}
            height={40}
            className=" dropdown-toggle rounded-circle img-fluid "
            src={photo ? photo : defaultAvata}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            alt="profile pic"
            role="button"
          />

          <div
            className="dropdown-menu dropdown-menu-end pt-3"
            style={{ width: "250px" }}
          >
            <div>
              <div className="text-center">
                <img
                  className="  rounded-circle img-fluid"
                  width={60}
                  height={60}
                  src={photo ? photo : defaultAvata}
                  alt="profile"
                />
                <h6 className="pt-2">{fistName + " " + lastName}</h6>
              </div>
              <ul style={{ listStyle: "none" }} className="fs-6 fw-medium">
                <li className="customHover" onClick={() => navigate("/")}>
                  <span className="fs-5 px-1">
                    <GoPeople />
                  </span>{" "}
                  profile
                </li>
                <li className="customHover" onClick={handleLogout}>
                  <span className="fs-5 px-1">
                    <AiOutlineLogout />
                  </span>{" "}
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
