import React from "react";
import Logo from "../../assets/CodeCrewLogo.png";
import "./Header.css";
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div>
    {/* Remove this after production */}
    <Link to="/admin">
        <button id='secretButton'>Secret Button :D</button>
    </Link>
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
