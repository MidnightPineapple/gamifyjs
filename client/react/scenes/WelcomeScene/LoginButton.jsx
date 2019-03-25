import React from 'react'
import styles from './LoginButton.css'
import PropTypes from 'prop-types'

const buttonStyles = {
    primary: {
        backgroundColor: "#f95e8e",
    },
    danger: {
        backgroundColor: "#ed1c24",
    },
    success: {
        backgroundColor: "#5dcd90",
    },
    warning: {
        backgroundColor: "#ede580",
        color:"#222222"
    },
    info: {
        backgroundColor: "#fafafa",
        color:"#222222"
    }
}

const LoginButton = ({ onClick, children, type }) => 
<button className={styles.button} onClick={onClick} style={buttonStyles[type]}>
    { children }
</button>


LoginButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string,
    type: PropTypes.string,
}

LoginButton.defaultProps = {
    type: "primary"
}

export default LoginButton