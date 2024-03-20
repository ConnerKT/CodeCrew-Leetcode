import React from 'react'
import Logo from "../../assets/CodeCrewLogo.png"
import './Header.css'

function Header() {
  return (
    <div>
        <div>
      <header className="header-container">
        <img src={Logo} alt="CodeCrewLogo" className="logo" />
      </header>
    </div>
    </div>
  )
}

export default Header
