import React, { useRef } from "react";
import "./form.css";
import { useAuth } from "../../contexts/auth";
const Register = () => {

  const registerRef = useRef(null);

  const {registerUser} = useAuth();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerRef.current);
    const data = Object.fromEntries(formData);
    registerUser(data)
  }

  return (
    <section>
      <h1 className="title-register">Register</h1>
      <div className="container">
        <form ref={registerRef} onSubmit={HandleSubmit}>
          <input type="email" placeholder="Your Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" className="btn btn-primary btn-register">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
