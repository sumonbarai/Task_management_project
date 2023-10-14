import { useState } from "react";
import getBase64 from "../utilities/base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/images/default_avata.png";
import {
  inputFieldError,
  validateEmail,
  validateMobile,
} from "../utilities/Fromhelper";
import { errorNotification } from "../utilities/NotificationHelper";
import { profileUpdateThunk } from "../redux/features/auth/authSlice";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const updatedState = {
    email: user?.data?.email,
    fistName: user?.data?.fistName,
    lastName: user?.data?.lastName,
    mobile: user?.data?.mobile,
    password: user?.data?.password,
    photo: user?.data?.photo,
  };

  const [data, setData] = useState(updatedState);
  const { email, mobile, photo } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state change handler
  const handleChange = (property, value) => {
    setData({
      ...data,
      [property]: value,
    });
  };

  const photoChangeHandler = (property, value) => {
    getBase64(value).then((base64Img) => {
      handleChange(property, base64Img);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // checking validation
    const isValidEmail = validateEmail(email);
    const isValidMobile = validateMobile(mobile);

    // email check
    if (!isValidEmail) {
      errorNotification("Please input valid email address");
    }

    if (!isValidMobile) {
      inputFieldError("invalid Bangladeshi Mobile Number");
    }

    // everything is ok now send registration request
    if (isValidEmail && isValidMobile) {
      dispatch(profileUpdateThunk(data))
        .unwrap()
        .then((data) => {
          console.log(data);
          if (data) {
            navigate("/");
          }
        })
        .catch((error) => {
          errorNotification(error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <h2>Profile</h2>
      <form
        className="row g-3 bg-body p-5 m-1 rounded-2"
        onSubmit={handleSubmit}
      >
        <div className=" mb-4">
          <img
            className="img-fluid rounded-circle"
            src={photo ? photo : defaultImg}
            alt="image"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-4">
          <label htmlFor="email">Choose file</label>
          <div className="input-group">
            <input
              type="file"
              className="form-control  my-1 focus-ring  custom animate__animated animate__fadeInUp"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              onChange={(e) => photoChangeHandler("photo", e.target.files[0])}
            />
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control my-1 focus-ring  custom animate__animated animate__fadeInUp"
            placeholder="Email Address"
            onChange={(e) => handleChange("email", e.target.value)}
            value={data.email}
            id="email"
          />
        </div>
        <div className="col-4">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            className="form-control my-1 focus-ring  custom animate__animated animate__fadeInUp"
            placeholder="First Name"
            onChange={(e) => handleChange("fistName", e.target.value)}
            value={data.fistName}
            id="firstName"
          />
        </div>
        <div className="col-4">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            className="form-control my-1 focus-ring  custom animate__animated animate__fadeInUp"
            placeholder="Last Name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            value={data.lastName}
            id="lastName"
          />
        </div>

        <div className="col-4">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control my-1 focus-ring  custom animate__animated animate__fadeInUp"
            placeholder="Mobile"
            onChange={(e) => handleChange("mobile", e.target.value)}
            value={data.mobile}
            id="mobile"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn my-1 text-white "
            style={{ background: "#D980FA", width: "20rem" }}
          >
            Update
          </button>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
