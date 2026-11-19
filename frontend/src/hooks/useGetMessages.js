import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessage } from "../redux/messageSlice.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    let cancelled = false;

    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      // Never show the previous conversation's thread while the next one loads.
      dispatch(setMessage([]));

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser?._id}`
        );
        if (!cancelled) dispatch(setMessage(res.data));
      } catch (err) {
        console.log(err);
        if (!cancelled) setError("failed");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    if (selectedUser?._id) fetchMessages();

    return () => {
      cancelled = true;
    };
  }, [selectedUser?._id, reloadKey, dispatch]);

  return { isLoading, error, refetch };
};

export default useGetMessages;
