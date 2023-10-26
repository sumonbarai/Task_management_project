import { useEffect, useState } from "react";
import {
  errorNotification,
  successNotification,
} from "../../utilities/NotificationHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTask,
  createTaskThunk,
} from "../../redux/features/task/taskSlice";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { removeLocalStorage } from "../../utilities/SessionHelper";

const initialState = {
  title: "",
  description: "",
};
const Create = () => {
  const { isLoading, error } = useSelector((state) => state.task);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // state change handler
  const handleChange = (property, value) => {
    setData({
      ...data,
      [property]: value,
    });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.title) {
      return errorNotification("title is empty");
    }
    if (!data.description) {
      return errorNotification("description is empty");
    }

    // every think is ok now call to api
    dispatch(createTaskThunk(data))
      .unwrap()
      .then((result) => {
        if (result.message === "success") {
          successNotification("Task create success");
          navigate("/new");
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          dispatch(loggedOut());
          removeLocalStorage("user");
        }
        errorNotification(error?.data?.message);
      });
  };

  return (
    <div className="container-fluid pt-3">
      <div
        className="bg-body p-5 rounded mx-auto mt-5"
        style={{ maxWidth: "50rem" }}
      >
        <h3 className="text-muted ">Create Task</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <input
              type="text"
              className="form-control focus-ring  custom animate__animated animate__fadeInUp"
              placeholder="Task Name"
              onChange={(e) => handleChange("title", e.target.value)}
              value={data.title}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control focus-ring custom animate__animated animate__fadeInUp"
              cols="30"
              rows="5"
              placeholder="Task Description"
              onChange={(e) => handleChange("description", e.target.value)}
              value={data.description}
            ></textarea>
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn text-white"
              style={{ background: "#D980FA" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Create;
