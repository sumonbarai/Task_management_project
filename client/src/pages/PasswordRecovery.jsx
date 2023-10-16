import { useState } from "react";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const PasswordRecovery = () => {
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
                className="form-control focus-ring  custom animate__animated animate__fadeInUp"
                placeholder="Your Email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={data.email}
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
    </div>
  );
};

export default PasswordRecovery;
