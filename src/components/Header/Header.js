import React from "react";
import "./Header.css"; // Ensure the CSS file is correctly imported
import photo from "../../photos/logo.png";

const Header = () => {
  return (
    <div className="headerContainer">
      {/* Use the relative path from the current file to the photo */}
      <img className="logo" src={photo} />
      <div className="header"></div>
    </div>
  );
};

export default Header;
