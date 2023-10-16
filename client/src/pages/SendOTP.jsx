import { useState } from "react";
import { inputFieldError, validateEmail } from "../utilities/Fromhelper";

const initialState = {
  email: "",
};

const SendOTP = () => {
  const [data, setData] = useState(initialState);

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
    const isValidEmail = validateEmail(data.email);

    // email check
    if (!isValidEmail) {
      inputFieldError("Please input valid email address");
    }

    // everything is ok now send registration request
    if (isValidEmail) {
      // dispatch(loginThunk({ email, password }))
      //   .unwrap()
      //   .then((data) => {
      //     if (data.token) {
      //       const result = setLocalStorage("user", data);
      //       if (result) {
      //         successNotification("login success");
      //         navigate("/");
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     errorNotification(error);
      //   });

      console.log("submit");
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
    </div>
  );
};

export default SendOTP;
