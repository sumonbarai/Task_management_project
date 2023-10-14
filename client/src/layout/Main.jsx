import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import SideMenu from "../components/Dashboard/SideMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const [show, setShow] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const onMdScreen = () => {
    setShow(false);
  };

  // Function to be executed when the screen size is not "md"
  const onNotMdScreen = () => {
    setShow(true);
  };

  // Function to check the screen size and trigger appropriate functions
  const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
      onMdScreen();
    } else {
      onNotMdScreen();
    }
  };

  // Add an event listener for window resize events
  useEffect(() => {
    checkScreenSize(); // Initial check

    window.addEventListener("resize", checkScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // checking user login or not
  useEffect(() => {
    if (!user?.token) {
      return navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="">
      <NavBar handleShow={handleShow} />
      <div className="container-fluid">
        <div className="d-flex">
          <SideMenu show={show} />
          <div
            className="right-area p-2 overflow-auto flex-grow-1 bg-body-secondary"
            style={{
              height: "calc(100vh - 62px)",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
