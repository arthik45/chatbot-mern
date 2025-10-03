import { useContext, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

// 🔹 Input Field (memoized)
const InputField = React.memo(({ icon, type, value, onChange, placeholder, autoComplete }) => (
  <div className="relative w-full">
    <img
      src={icon}
      alt=""
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70"
    />
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-label={placeholder}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      required
    />
  </div>
));

const Login = () => {
  const { backendurl, login } = useContext(AppContext);
  const [state, setState] = useState("signup"); // signup or login
  const [username, setUsername] = useState(""); // updated from 'name'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Input handlers
  const handleUsernameChange = useCallback((e) => setUsername(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

  // 🔹 Handle form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = state === "signup"
        ? `${backendurl}/api/auth/register`
        : `${backendurl}/api/auth/login`;

      const body = state === "signup"
        ? { username, email, password } // use 'username' for backend
        : { email, password };

      const { data } = await axios.post(url, body, { withCredentials: true });
      
      // Save user in context
      login(data.user);

      toast.success(state === "signup" ? "Account created successfully!" : "Logged in successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-100 via-green-200 to-green-400">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {state === "signup" ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          {state === "signup" && (
            <InputField
              icon={assets.person_icon}
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              autoComplete="username"
            />
          )}

          <InputField
            icon={assets.mail_icon}
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            autoComplete="email"
          />

          {/* Password with toggle */}
          <div className="relative w-full">
            <img
              src={assets.lock_icon}
              alt="lock"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              autoComplete={state === "signup" ? "new-password" : "current-password"}
              aria-label="Password"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-green-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password */}
          {state === "login" && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-green-700 hover:underline"
                onClick={() => navigate("/reset-password")}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : state === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setState("login");
                  setUsername("");
                  setPassword("");
                }}
                className="text-green-700 font-medium hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setState("signup");
                  setPassword("");
                }}
                className="text-green-700 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
