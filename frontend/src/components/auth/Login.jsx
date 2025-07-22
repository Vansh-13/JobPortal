import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import api from '../../utils/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice.js';
import { ImSpinner2 } from 'react-icons/im';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(90);
  const [resendAvailable, setResendAvailable] = useState(false);

  const changeHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, role } = input;
    if (!email || !password || !role) {
      toast.error('All fields are required.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Enter a valid email.');
      return false;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      await api.post('/user/send-otp', { email: input.email });
      toast.success('OTP sent to your email');
      setShowOtpModal(true);
      setTimer(90);
      setResendAvailable(false);
    } catch (err) {
      console.error('OTP send error:', err.response || err);
      toast.error('Failed to send OTP');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await api.post('/user/login', { ...input, otp });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Login Successful!');
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (err) {
      console.error('OTP/Login error:', err.response || err);
      toast.error('Login failed. Check OTP or credentials.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOtp = async () => {
    try {
      dispatch(setLoading(true));
      await api.post('/user/send-otp', { email: input.email });
      toast.success('OTP resent to your email');
      setOtp('');
      setTimer(90);
      setResendAvailable(false);
    } catch (err) {
      console.error('Resend OTP error:', err.response || err);
      toast.error('Failed to resend OTP');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) setResendAvailable(true);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500';

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return '';
    const maskedUser =
      user.length <= 4 ? user[0] + '*'.repeat(user.length - 1) : user.slice(0, 4) + '*'.repeat(user.length - 4);
    return `${maskedUser}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      <div className="flex justify-center items-center px-4 py-12">
        <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden relative z-10">
          <div className="hidden md:block md:w-1/2 bg-teal-50">
            <img
              src="https://illustrations.popsy.co/gray/remote-work.svg"
              alt="Login"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandle}
                placeholder="Email"
                className={inputClass}
              />

              {/* Password input with eye icon */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={input.password}
                  onChange={changeHandle}
                  placeholder="Password"
                  className={inputClass}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-teal-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>

              <select
                name="role"
                value={input.role}
                onChange={changeHandle}
                className={inputClass}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition"
                disabled={loading}
              >
                {loading ? <ImSpinner2 className="animate-spin inline-block" /> : 'Login'}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-teal-600 hover:underline">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-white/30 z-50">
          <div className="bg-white border border-gray-300 rounded-xl shadow-xl w-[95%] max-w-md px-6 py-6 relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Verify Your Email
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter the 6-digit OTP sent to <strong>{maskEmail(input.email)}</strong>
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]*"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className={inputClass}
            />
            <p className="text-sm text-center text-gray-500 mt-2">
              Expires in <span className="text-red-600 font-semibold">{formatTime(timer)}</span>
            </p>
            <button
              onClick={handleOtpVerify}
              className="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? <ImSpinner2 className="animate-spin inline-block" /> : 'Verify & Login'}
            </button>

            {resendAvailable && (
              <button
                onClick={handleResendOtp}
                className="mt-3 w-full py-2 border border-teal-600 text-teal-700 rounded-md hover:bg-teal-100 transition"
              >
                Resend OTP
              </button>
            )}

            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
