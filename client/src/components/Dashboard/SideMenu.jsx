import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdCreate, MdFiberNew, MdCancelPresentation } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { BsCheckCircle } from "react-icons/bs";
const SideMenu = ({ show }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const widthControl = show
    ? {
        minWidth: "220px",
        height: "calc(100vh - 119px)",
      }
    : {
        width: "0px",
        height: "calc(100vh - 119px)",
      };

  return (
    <div className="left-area overflow-auto mt-5 bg-body " style={widthControl}>
      <ul style={{ listStyle: "none" }} className="p-0 ">
        <li
          className={`p-2  mb-1  customHover ${path === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <span className="text-black fs-5 pe-2">
            <TbLayoutDashboard />
          </span>
          <Link to="/" className="text-decoration-none text-black ">
            DashBoard
          </Link>
        </li>
        <li
          className={`p-2  mb-1  customHover ${
            path === "/create" ? "active" : ""
          }`}
          onClick={() => navigate("/create")}
        >
          <span className="text-black fs-5 pe-2">
            <MdCreate />
          </span>
          <Link to="/create" className="text-decoration-none text-black">
            Create Task
          </Link>
        </li>
        <li
          className={`p-2  mb-1  customHover ${
            path === "/new" ? "active" : ""
          }`}
          onClick={() => navigate("/new")}
        >
          <span className="text-black fs-5 pe-2">
            <MdFiberNew />
          </span>
          <Link to="/new" className="text-decoration-none text-black">
            New Task
          </Link>
        </li>
        <li
          className={`p-2  mb-1  customHover ${
            path === "/progress" ? "active" : ""
          }`}
          onClick={() => navigate("/progress")}
        >
          <span className="text-black fs-5 pe-2">
            <GrInProgress />
          </span>
          <Link to="/progress" className="text-decoration-none text-black">
            In Progress
          </Link>
        </li>
        <li
          className={`p-2  mb-1  customHover ${
            path === "/completed" ? "active" : ""
          }`}
          onClick={() => navigate("/completed")}
        >
          <span className="text-black fs-5 pe-2">
            <BsCheckCircle />
          </span>
          <Link to="/completed" className="text-decoration-none text-black">
            Completed
          </Link>
        </li>
        <li
          className={`p-2  mb-1  customHover ${
            path === "/canceled" ? "active" : ""
          }`}
          onClick={() => navigate("/canceled")}
        >
          <span className="text-black fs-5 pe-2">
            <MdCancelPresentation />
          </span>
          <Link to="/canceled" className="text-decoration-none text-black">
            Canceled
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
