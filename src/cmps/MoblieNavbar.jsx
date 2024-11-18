import React from "react";
import { NavLink } from "react-router-dom";


export function MobileNavbar() {
  return (
    <nav className="mobile-navbar">
      <NavLink to="/library" className="nav-btn library-btn">
        Library
      </NavLink>
      <NavLink to="/browse" className="nav-btn browse-btn">
        Browse
      </NavLink>
      <NavLink to="/home" className="nav-btn home-btn">
        Home
      </NavLink>
    </nav>
  )
}
