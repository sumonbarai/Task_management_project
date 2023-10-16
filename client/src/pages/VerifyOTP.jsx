import { useState } from "react";
import ReactCodeInput from "react-code-input";
import Loader from "../components/Loader/Loader";
import {
  errorNotification,
  successNotification,
} from "../utilities/NotificationHelper";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utilities/SessionHelper";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const email = getLocalStorage("email");

  // handle code
  const handleChange = (value) => {
    setCode(value);
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        return errorNotification("email code required");
      }

      if (!code) {
        return errorNotification("otp code required");
      }

      if (!(code.length === 6)) {
        return errorNotification("Otp code must be 6 character");
      }

      const result = await axios.get(`verifyOtp/${email}/${code}`);

      successNotification(result?.data?.message);
      setLocalStorage("email", email);
      navigate("/passwordRecovery");
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
          <h3 className="text-muted pb-3">OTP VERIFICATION</h3>
          <p style={{ fontSize: "14px" }} className="">
            6 digit verification code has been send your email address
          </p>
          <form className="row g-3 " onSubmit={handleSubmit}>
            <div className="col-12 animate__animated animate__fadeInUp">
              <ReactCodeInput type="text" fields={6} onChange={handleChange} />
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

export default VerifyOTP;
