import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inputFieldError, validateEmail } from "../utilities/Fromhelper";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/features/auth/authSlice";
import {
  errorNotification,
  successNotification,
} from "../utilities/NotificationHelper";
import Loader from "../components/Loader/Loader";
import { setLocalStorage } from "../utilities/SessionHelper";

const initialState = {
  email: "sumonbarai78@gmail.com",
  password: "123456",
};
const Login = () => {
  const [data, setData] = useState(initialState);
  const { email, password } = data;

  const { isLoading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // checking user login or not
  useEffect(() => {
    if (user?.token) {
      return navigate("/");
    }
  }, [user, navigate]);

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

    // email check
    if (!isValidEmail) {
      inputFieldError("Please input valid email address");
    }

    // everything is ok now send registration request
    if (isValidEmail) {
      dispatch(loginThunk({ email, password }))
        .unwrap()
        .then((data) => {
          if (data.token) {
            const result = setLocalStorage("user", data);

            if (result) {
              successNotification("login success");
              navigate("/");
            }
          }
        })
        .catch((error) => {
          errorNotification(error);
        });
    }
  };
  return (
    <div className="vh-100 vw-100 bg-body-secondary d-flex justify-content-center align-items-center    ">
      <div className="p-3">
        <div
          className="bg-body p-5 rounded shadow mx-auto "
          style={{ maxWidth: "35rem" }}
        >
          <h3 className="text-muted pb-3">Sign In</h3>
          <form className="row g-3 " onSubmit={handleSubmit}>
            <div className="col-12 ">
              <input
                type="email"
                className="form-control focus-ring  custom"
                placeholder="Your Email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={email}
              />
            </div>
            <div className="col-12 ">
              <input
                type="password"
                className="form-control focus-ring  custom"
                placeholder="Your Password"
                onChange={(e) => handleChange("password", e.target.value)}
                value={password}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn text-white"
                style={{ background: "#D980FA" }}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-3">
            Create new account?
            <span className="text-orange-500">
              <Link to="/register" style={{ color: "#D980FA" }}>
                {" "}
                Register
              </Link>
            </span>
          </p>
          <p>
            <span className="text-orange-500">
              <Link to="/sendOtp" style={{ color: "#D980FA" }}>
                {" "}
                Forgotten password?
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

export default Login;
