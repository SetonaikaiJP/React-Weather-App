import React from "react";

const NavButton = ({ title, onClick }) => {
  return (
    <button className="nav-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default NavButton;
