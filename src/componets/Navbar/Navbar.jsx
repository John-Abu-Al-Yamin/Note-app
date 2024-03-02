import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { CiStickyNote } from "react-icons/ci";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  return (
    <div className="headre">
      {user ? (
        <>
          <nav>
            <div className="nav-logo">
              <h2>
                Notes <CiStickyNote />
              </h2>
            </div>
            <div className="sing-link">
              <Link to={"/"}>Home</Link>
              <Link to={"/notes"}>Notes</Link>
            </div>
            <button onClick={logoutUser} className="btn btn-primary logout">
              Logout
            </button>
          </nav>
        </>
      ) : (
        <>
          <div className="nav-rigth">
            <div className="nav-logo">
              <h2>Notes</h2>
            </div>
            <Link className="home-link" to={"/"}>
              Home
            </Link>
            <div className="button-auth">
              <Link className="btn" to={"/register"}>
                Register
              </Link>
              <Link className="btn btn-primary" to={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

<div className="nav-rigth">
  <Link className="btn" to={"/register"}>
    Register
  </Link>
  <Link className="btn btn-primary" to={"/login"}>
    Login
  </Link>
</div>;
