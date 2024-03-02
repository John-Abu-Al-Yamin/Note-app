import React, { useRef } from "react";
import "./form.css";
import { useAuth } from "../../contexts/auth";
const Login = () => {
  const loginrRef = useRef(null);

  const { loginUser } = useAuth();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(loginrRef.current);
    const data = Object.fromEntries(formData);

     loginUser(data);
  };

  return (
    <section>
      <h1 className="title-register">Login</h1>
      <div className="container">
        <form ref={loginrRef} onSubmit={HandleSubmit}>
          <input type="email" placeholder="Your Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" className="btn btn-primary btn-register">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
