import { useEffect, useState } from "react";
import { getLocalStorage } from "../utilities/SessionHelper";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/features/auth/authSlice";

const useAuthCheck = () => {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (user) {
      setData(user);
      dispatch(loggedIn(user));
    }
  }, []);

  return [data, setData];
};

export default useAuthCheck;
