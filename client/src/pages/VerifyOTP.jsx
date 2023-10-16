import { useState } from "react";
import ReactCodeInput from "react-code-input";

const VerifyOTP = () => {
  const [code, setCode] = useState("");

  const handleChange = (value) => {
    setCode(value);
  };
  console.log(code);
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // // checking validation
    // const isValidEmail = validateEmail(data.email);

    // // email check
    // if (!isValidEmail) {
    //   inputFieldError("Please input valid email address");
    // }

    // everything is ok now send registration request
    // if (isValidEmail) {
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

    console.log(code);
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
    </div>
  );
};

export default VerifyOTP;
