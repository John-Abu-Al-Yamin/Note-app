import { createContext, useState, useEffect, useContext } from "react";
import {toast} from "react-toastify"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const loginUser = async (formdata) => {
    const res = await fetch(
      `https://back-end-note.onrender.com/api/v1/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    );
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      setUser(data.token);
      localStorage.setItem("token", data.token);

      toast.success("User Logged in Successfully");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  const registerUser = async (formdata) => {
    const res = await fetch(
      `https://back-end-note.onrender.com/api/v1/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    );
    const data = await res.json();
    // console.log(data);
    if (data.success) {
      setUser(data.token);
      localStorage.setItem("token", data.token);
      toast.success("User Register in Successfully");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("User Logged Out Successfully");
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
