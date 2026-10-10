import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Homepage from "./components/Homepage.jsx"
import SignUp from "./components/SignUp.jsx"
import Login from "./components/Login.jsx"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"
import { useEffect, useState } from "react"
import { setOnlineUsers } from "./redux/userSlice.js"
import { setSocket } from "./redux/socketSlice.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
])


const App = () => {
  const { authUser } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authUser) {
      const socketio = io(import.meta.env.VITE_API_URL, {
        query: {
          userId: authUser._id
        }
      })
      dispatch(setSocket(socketio))

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => {
        socketio.close();
      }

    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
