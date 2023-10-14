import toast from "react-hot-toast";

class FormHelper {
  inputFieldError(message) {
    toast.error(message);
  }

  inputFieldSuccess(message) {
    toast.error(message);
  }
  inputFieldTrim(input) {
    return input.trim();
  }

  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  validateMobile(mobile) {
    return mobile.match(/^(?:\+?88|0088)?01[15-9]\d{8}$/);
  }
}

export const {
  inputFieldSuccess,
  inputFieldError,
  validateEmail,
  validateMobile,
  inputFieldTrim,
} = new FormHelper();
