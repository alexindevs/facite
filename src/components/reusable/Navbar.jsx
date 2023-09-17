import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useSiteContext } from '../../SiteContext';
import logo from '../../images/logo.png';

const Navbar = (props) => {
  const [isActive, setIsActive] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useSiteContext();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  

  return (
    <header>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="navbar">
        <nav>
          <a className={`${styles.navbarBrand}`} href="#">
            <img className={`${styles.icon}`} style={{ display: isLoggedIn ? 'none' : 'block' }}  src={logo}/>
          </a>
          <ul className={`${styles.navList} ${isActive ? styles.active : ''}`}  style={{ background: isLoggedIn ? '#ffffff' : 'linear-gradient(to bottom, rgb(0, 119, 247), rgb(24, 136, 255))' }}>
            <li className={`${styles.navItem}`}>
              <a className={`${styles.navLink}`} href="/"  style={{ color: isLoggedIn ? '#000000' : 'white' }}>home</a>

            </li>
            <li className={`${styles.navItem}`}>
              <a className={`${styles.navLink}`}  style={{ color: isLoggedIn ? '#000000' : 'white' }} href="/">about</a>
            </li>
            <li className={`${styles.navItem}`}>
              <a className={`${styles.navLink}`}  style={{ color: isLoggedIn ? '#000000' : 'white' }} href="/">work with me</a>
            </li>
            <li className={`${styles.navItem}`}>
              <a className={`${styles.navLink}`}  style={{ color: isLoggedIn ? '#000000' : 'white' }} href="/">contact us</a>
            </li>
          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleMenu}>
            <div className={styles.line} style={{ backgroundColor: isLoggedIn ? '#000000' : 'white' }}></div>
            <div className={styles.line} style={{ backgroundColor: isLoggedIn ? '#000000' : 'white' }}></div>
            <div className={styles.line} style={{ backgroundColor: isLoggedIn ? '#000000' : 'white' }}></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;