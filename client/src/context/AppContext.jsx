import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
export const AppContext = createContext();

// Context provider
export const AppContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL:", backendurl);


  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    setLoading(true);    // start loading
    setError(null);      // reset previous errors

    try {
      const response = await axios.get(`${backendurl}/api/user/data`, {
        withCredentials: true, // include cookies/JWT if needed
      });

      setUserData(response.data);  // store user data in context
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch user data";
      setError(message);
      toast.error(message);        // show toast error
      console.error(err);
    } finally {
      setLoading(false);           // stop loading
    }
  };




  // 🔹 Check auth on first load (persist login)
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsLoggedin(true);
    }
  }, []);



  // 🔹 Login
  const login = (user) => {
    setIsLoggedin(true);
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${backendurl}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggedin(false);
      setUserData(null);
      localStorage.removeItem("userData");
      setLoading(false);
    }
  };

  // 🔹 Example: Fetch current user (verify session)
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendurl}/auth/me`, {
        withCredentials: true,
      });
      setUserData(data.user);
      setIsLoggedin(true);
      localStorage.setItem("userData", JSON.stringify(data.user));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user");
      setIsLoggedin(false);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    loading,
    error,
    setError,
    login,   // function
    logout,  // function
    fetchUser, // function
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
