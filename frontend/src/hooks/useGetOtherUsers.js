import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ loading: true, error: null });

  const fetchOtherUsers = useCallback(async () => {
    setStatus({ loading: true, error: null });
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/`);
      dispatch(setOtherUsers(res.data));
      setStatus({ loading: false, error: null });
    } catch (error) {
      console.log(error);
      setStatus({
        loading: false,
        error:
          error?.response?.status === 401 ? "unauthenticated" : "failed",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);

  return { ...status, refetch: fetchOtherUsers };
};

export default useGetOtherUsers;
