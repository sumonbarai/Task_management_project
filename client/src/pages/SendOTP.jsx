import { useState } from "react";
import { inputFieldError, validateEmail } from "../utilities/Fromhelper";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "../utilities/NotificationHelper";
import { setLocalStorage } from "../utilities/SessionHelper";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
};

const SendOTP = () => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (property, value) => {
    setData({
      ...data,
      [property]: value,
    });
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // checking validation
      const isValidEmail = validateEmail(data.email);

      // email check
      if (!isValidEmail) {
        return inputFieldError("Please input valid email address");
      }
      // everything is ok now send opt request
      if (isValidEmail) {
        const result = await axios.get(`/sendOtp/${data.email}`);

        successNotification(result?.data?.message);
        setLocalStorage("email", data.email);
        navigate("/verifyOtp");
      }
    } catch (error) {
      errorNotification("something is wrong");
      console.log(error);
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
          <h3 className="text-muted pb-3">EMAIL ADDRESS</h3>
          <form className="row g-3 " onSubmit={handleSubmit}>
            <div className="col-12 ">
              <input
                type="email"
                className="form-control focus-ring  custom animate__animated animate__fadeInUp"
                placeholder="Your Email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={data.email}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn text-white animate__animated animate__fadeInUp"
                style={{ background: "#D980FA" }}
              >
                NEXT
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default SendOTP;
