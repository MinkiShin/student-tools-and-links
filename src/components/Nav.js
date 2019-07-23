import React from "react";
import { auth } from "../utils/db";
import "./Nav.scss";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="Nav">
      <div className="left">
        <Link to="/">Dashboard</Link>
        <Link to="/my">My Links</Link>
        <Link to="/all">Newest</Link>
        <Link to="/popular">Popular</Link>
      </div>

      <div className="right">
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign-out
        </button>
      </div>
    </nav>
  );
}

export default Nav;
