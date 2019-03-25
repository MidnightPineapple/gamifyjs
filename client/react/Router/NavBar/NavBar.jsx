import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.css'
import PropTypes from 'prop-types'

const Link = ({ children, to }) => 
    <NavLink 
    className={styles.navLink} 
    to={to} 
    activeClassName={styles.navLinkActive}>
        { children }
    </NavLink>

Link.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

const NavBar = () =>
    <nav className={styles.navBar}>
        <Link to="/">GamifyJS</Link>

        <div class={styles.navOptions}>
            <Link to="/">Dashboard</Link>
            <Link to="/">My Profile</Link>
        </div>
    </nav>

export default NavBar