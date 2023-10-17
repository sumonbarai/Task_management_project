import { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getTaskByStatusThunk } from "../../redux/features/task/taskSlice";
import Loader from "../Loader/Loader";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { removeLocalStorage } from "../../utilities/SessionHelper";
import { errorNotification } from "../../utilities/NotificationHelper";

const New = () => {
  const { isLoading, new: newTask, error } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  // if user token has expired
  useEffect(() => {
    if (error.status === 403) {
      dispatch(loggedOut());
      removeLocalStorage("user");
      errorNotification("your token expired please login");
    }
  }, [dispatch, error.status]);

  useEffect(() => {
    dispatch(getTaskByStatusThunk("new"));
  }, [dispatch]);

  return (
    <div className="container-fluid pt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
        {newTask.length > 0 &&
          newTask.map((item) => {
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

        {newTask.length === 0 && isLoading === false && <p>No task found</p>}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default New;
