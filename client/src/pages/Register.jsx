import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  inputFieldError,
  inputFieldTrim,
  validateEmail,
  validateMobile,
} from "../utilities/Fromhelper";
import { registrationThunk } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { errorNotification } from "../utilities/NotificationHelper";

const initialState = {
  email: "",
  fistName: "",
  lastName: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  photo: "",
};

const Register = () => {
  const [data, setData] = useState(initialState);
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, fistName, lastName, mobile, password, confirmPassword } = data;

  const handleChange = (property, value) => {
    setData({
      ...data,
      [property]: value,
    });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // checking validation
    const isValidEmail = validateEmail(email);
    const isMatchPassword = password === confirmPassword;
    const isValidMobile = validateMobile(mobile);

    // email check
    if (!isValidEmail) {
      inputFieldError("Please input valid email address");
    }

    if (!isMatchPassword) {
      inputFieldError("password does not match");
    }
    if (!isValidMobile) {
      inputFieldError("invalid Bangladeshi Mobile Number");
    }

    // everything is ok now send registration request
    if (isValidEmail && isMatchPassword && isValidMobile) {
      dispatch(registrationThunk(data));
    }
  };

  // if error in registration process
  useEffect(() => {
    if (error) {
      errorNotification(error);
    }
  }, [error]);

  // after successfully register
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="vh-100 vw-100 bg-body-secondary d-flex justify-content-center align-items-center">
      <div className="p-3">
        <div
          className="bg-body p-5 rounded shadow mx-auto "
          style={{ maxWidth: "35rem" }}
        >
          <h3 className="text-muted pb-3">Sign Up</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <input
                required
                type="email"
                className="form-control focus-ring  custom"
                placeholder="Your Email"
                onChange={(e) =>
                  handleChange("email", inputFieldTrim(e.target.value))
                }
                value={email}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                required
                className="form-control focus-ring  custom"
                placeholder="Your First Name"
                onChange={(e) =>
                  handleChange("fistName", inputFieldTrim(e.target.value))
                }
                value={fistName}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control focus-ring  custom"
                required
                placeholder="Your Last Name"
                onChange={(e) =>
                  handleChange("lastName", inputFieldTrim(e.target.value))
                }
                value={lastName}
              />
            </div>
            <div className="col-12">
              <input
                type="number"
                className="form-control focus-ring  custom"
                required
                placeholder="Your Mobile"
                onChange={(e) =>
                  handleChange("mobile", inputFieldTrim(e.target.value))
                }
                value={mobile}
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control focus-ring  custom"
                required
                placeholder="Your Password"
                onChange={(e) => handleChange("password", e.target.value)}
                value={password}
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control focus-ring  custom"
                required
                placeholder="Your Confirm Password"
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                value={confirmPassword}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn text-white"
                style={{ background: "#D980FA" }}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-3">
            Already have an account?
            <span className="text-orange-500">
              <Link to="/login" style={{ color: "#D980FA" }}>
                {" "}
                Login
              </Link>
            </span>
          </p>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Register;
