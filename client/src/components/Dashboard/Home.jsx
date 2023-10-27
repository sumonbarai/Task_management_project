import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect } from "react";
import {
  clearTask,
  taskByStatusCountThank,
} from "../../redux/features/task/taskSlice";

import Loader from "../Loader/Loader";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { removeLocalStorage } from "../../utilities/SessionHelper";
import { errorNotification } from "../../utilities/NotificationHelper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, dashboard, error } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(taskByStatusCountThank());
    }
  }, [dispatch, user?.token]);

  // if user token has expired
  useEffect(() => {
    if (error?.status === 403) {
      dispatch(loggedOut());
      dispatch(clearTask());
      removeLocalStorage("user");
      errorNotification("your token expired please login");
      navigate("/login");
    }
  }, [error?.status]);

  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-3 row-cols-xxl-4 g-3">
        {dashboard.length > 0 &&
          dashboard.map((item, index) => {
            const { _id, total } = item;
            return (
              <div key={index} className="col">
                <Card title={_id} count={total} />
              </div>
            );
          })}

        {dashboard.length === 0 && <p>No task found</p>}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
