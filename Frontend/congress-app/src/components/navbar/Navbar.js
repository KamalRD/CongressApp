import React from "react";

import { Link } from "react-router-dom";

import "./navbar.css"


function Navbar() {
    return (
        <nav className="navbarContainer">
            <a href="/" className="logo">
                Checks 'n Balances
            </a>
            <div className="navbarMenu">
                <ul>
                    <li><Link to="/map">MAP</Link></li>
                    <li><Link to="/parties">PARTIES</Link></li>
                    <li><Link to="/chamber">CHAMBER</Link></li>
                    <li><Link to="/states">STATES</Link></li>
                    {/* <li><Link to="/politicians">POLITICIANS</Link></li> */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;