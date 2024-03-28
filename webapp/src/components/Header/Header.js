import React from "react";
import Logo from "../../assets/CodeCrewLogo.png";
import "./Header.css";
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div>
      <div>

        <header className="header-container">
        <Link to='/' id='headerImage'>
        <img src={Logo} alt="CodeCrewLogo" className="logo" onclick='/'/>
        </Link>
          
        </header>

        
      </div>
    </div>
  );
}

export default Header;
