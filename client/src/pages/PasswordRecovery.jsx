import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../utilities/SessionHelper";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../utilities/NotificationHelper";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const PasswordRecovery = () => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const email = getLocalStorage("email");

  const handleChange = (property, value) => {
    setData({
      ...data,
      [property]: value,
    });
  };

  // first time save the email state from local storage
  useEffect(() => {
    handleChange("email", email);
  }, []);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (data.password !== data.confirmPassword) {
        return errorNotification("password does't match");
      }

      // reset password request
      const result = await axios.post(`/resetPassword`, {
        email: data.email,
        password: data.password,
      });

      successNotification(result?.data?.message);
      navigate("/login");
      removeLocalStorage("email");
    } catch (error) {
      errorNotification(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100 vw-100 bg-body-secondary d-flex justify-content-center align-items-center    ">
      <div className="p-3">
        <div
          className="bg-body p-5 rounded shadow mx-auto "
          style={{ maxWidth: "35rem" }}
        >
          <h3 className="text-muted pb-3">SET NEW PASSWORD</h3>
          <form className="row g-3 " onSubmit={handleSubmit}>
            <div className="col-12 ">
              <input
                type="email"
                className="form-control focus-ring  custom bg-body-secondary animate__animated animate__fadeInUp"
                placeholder="Your Email"
                value={data.email}
                readOnly
              />
            </div>
            <div className="col-12 ">
              <input
                type="password"
                className="form-control focus-ring  custom animate__animated animate__fadeInUp"
                placeholder="New password"
                onChange={(e) => handleChange("password", e.target.value)}
                value={data.password}
              />
            </div>
            <div className="col-12 ">
              <input
                type="password"
                className="form-control focus-ring  custom animate__animated animate__fadeInUp"
                placeholder="Confirm New password"
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                value={data.confirmPassword}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn text-white animate__animated animate__fadeInUp"
                style={{ background: "#D980FA" }}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default PasswordRecovery;
