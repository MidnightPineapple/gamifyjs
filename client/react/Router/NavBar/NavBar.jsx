import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import styles from './NavBar.css'
import PropTypes from 'prop-types'

const Link = props => 
    <NavLink 
    className={styles.navLink} 
    activeClassName={styles.navLinkActive}
    {...props}/>

Link.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

const NavBar = ({ location, except = [] }) => except.find( p => p === location.pathname ) 
? null 
: (
    <nav className={[styles.navBar, styles.navLinkContainer].join(" ")}>
        <Link exact to="/">GamifyJS</Link>

        <div className={[styles.navOptions, styles.navLinkContainer].join(" ")}>
            <Link to="/game">Play Game</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">My Profile</Link>
        </div>
    </nav>
)

NavBar.propTypes = {
    except: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.object.isRequired,
}

export default withRouter(NavBar)