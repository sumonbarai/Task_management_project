import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import {
  clearTask,
  getTaskByStatusThunk,
} from "../../redux/features/task/taskSlice";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { removeLocalStorage } from "../../utilities/SessionHelper";
import { errorNotification } from "../../utilities/NotificationHelper";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, completed, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskByStatusThunk("completed"));
  }, [dispatch]);

  // if user token has expired
  useEffect(() => {
    if (error?.status === 403) {
      dispatch(loggedOut());
      dispatch(clearTask());
      removeLocalStorage("user");
      errorNotification("your token expired please login");
      navigate("/login");
    }
  }, [dispatch, error?.status]);

  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
        {completed.length > 0 &&
          completed.map((item) => {
            const { _id, createdAt, description, status, title } = item;
            return (
              <div key={_id} className="col">
                <Card
                  _id={_id}
                  title={title}
                  description={description}
                  date={createdAt}
                  status={status}
                />
              </div>
            );
          })}

        {completed.length === 0 && isLoading === false && <p>No task found</p>}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Completed;
