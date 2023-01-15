import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [Open, setOpen] = useState(false)
  return (
    <nav className={`navBar ${Open ? 'open' : 'close'}`}>
      <div className='logo'><img src={Logo} alt="Logo" /></div>
      <button onClick={() => setOpen(!Open)}>but</button>
      <ul>
        <li><NavLink to={`/`}>Home</NavLink></li>
      </ul>
    </nav>
  )
}

export default Header