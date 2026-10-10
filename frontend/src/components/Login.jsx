import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      navigate("/")
      toast.success("Login Successful")
      dispatch(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred")
    }
    setUser({
      username: '',
      password: ''
    })
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/Moonlit_bg.png')` }}
    >
      {/* Glassmorphism Container */}
      <div className="w-full max-w-[420px] p-10 rounded-[2.5rem] border border-white/10 bg-[#0a0b16]/50 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(75,85,150,0.4)]">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-[4.5rem] h-16 mb-2">
            <img src='VIBE_Favicon.png' />
          </div>
          <h1 className="text-[2rem] font-bold text-white tracking-wide mt-2">Login</h1>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Email/Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-[1.1rem] w-[1.1rem] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Email or Username"
              className="w-full pl-12 pr-4 py-3.5 bg-[#171a2a]/60 border border-white/5 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#5961e6]/50 focus:ring-1 focus:ring-[#5961e6]/50 transition-all text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-[1.1rem] w-[1.1rem] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3.5 bg-[#171a2a]/60 border border-white/5 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#5961e6]/50 focus:ring-1 focus:ring-[#5961e6]/50 transition-all text-sm"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>


          {/* Login Button */}
          <button className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-gradient-to-r from-[#5a5fdb] to-[#6d8bf4] hover:from-[#4b50c4] hover:to-[#5c7ae0] active:scale-95 text-white py-3.5 rounded-2xl transition-all duration-150 shadow-[0_4px_20px_rgba(90,95,219,0.3)] font-medium mt-8 text-sm">
            <span>Log In</span>
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-[0.9rem] text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6d8bf4] hover:text-[#88a1f7] font-semibold transition-colors">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
