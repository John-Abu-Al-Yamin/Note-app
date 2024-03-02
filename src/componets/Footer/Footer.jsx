import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiStickyNote } from "react-icons/ci";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <a href="" className="footer-logo">
        Note_App <CiStickyNote/>
      </a>

      <ul className="footer-link">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      </ul>
      <h2 className="footer-contact">Contact Me and Send Me Your Opinion</h2>
      <div className="footer-socials">
        <a href="https://www.facebook.com/john.emad.7359" target="_blank">
          <FaFacebook/>
        </a>
        <a href="mailto:je0409389@gmail.com" target="_blank"><MdEmail/></a>
        <a
          href="https://api.whatsapp.com/send?phone=+201286976691"
          target="_blank"
        >
          <FaWhatsapp/>
        </a>
      </div>
      <div className="footer-copy">
        <h3>&copy; Created by John Abou-Al-Yamin. All rights reserved</h3>
      </div>
    </footer>
  );
};

export default Footer;
