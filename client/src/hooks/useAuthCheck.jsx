import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../utilities/SessionHelper";
import { loggedIn } from "../redux/features/auth/authSlice";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (user) {
      dispatch(loggedIn(user));
    }
    setAuthChecked(true);
  }, []);

  return authChecked;
};

export default useAuthCheck;
