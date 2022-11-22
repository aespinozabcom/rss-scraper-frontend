import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./styles/navbar.css";

export const Navbar = ({ toggle, setToggle }) => {
  const onClick = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <button className="left-span btn btn-dark" onClick={onClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <span className="text-light right-span">RSS</span>
      <span className="text-light right-span"></span>
    </nav>
  );
};
