import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div className="bg-gray-400 text-center p-6 mt-10 space-y-2">
        <p>CareerConnect © 2025. All rights reserved.</p>
        <p>
          Powered by <a href="https://github.com/krishnam2003">Krishnam Singh</a>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/TermsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;