import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect } from "react";
import { taskByStatusCountThank } from "../../redux/features/task/taskSlice";

import Loader from "../Loader/Loader";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { removeLocalStorage } from "../../utilities/SessionHelper";
import { errorNotification } from "../../utilities/NotificationHelper";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, dashboard, error } = useSelector((state) => state.task);

  // if user token has expired
  useEffect(() => {
    if (error.status === 403) {
      dispatch(loggedOut());
      removeLocalStorage("user");
      errorNotification("your token expired please login");
    }
  }, [dispatch, error.status]);

  useEffect(() => {
    dispatch(taskByStatusCountThank());
  }, [dispatch]);

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
