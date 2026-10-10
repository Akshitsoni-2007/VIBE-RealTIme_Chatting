import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { setMessage } from '../redux/messageSlice.js';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/message/${selectedUser?._id}`)
                console.log(res.data);
                dispatch(setMessage(res.data));
            } catch (error) {
                console.log(error);
            }
        }

        fetchMessages();
    }, [selectedUser])
}

export default useGetMessages