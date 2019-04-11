import React, { Component, Fragment } from 'react'
import styles from './WelcomeScene.css'
import Button from './LoginButton'
import contain from '../../ContentContainer'

class WelcomeScene extends Component {
    
    render() {
        return(
            <Fragment>
                <header className={styles.header}>
                    <h1 className={styles.title}>GamifyJS</h1>
                </header>
                <div className={styles.loginOptions}>
                    <Button onClick = {() => window.location.replace("/login")} type="primary">Login</Button>
                    <Button onClick = {() => window.location.replace("/user/create")} type="info">New User</Button>
                </div>
            </Fragment>
        )
    }

}

const containerStyle = {
    display:'flex',
    flexDirection:"column",
    justifyContent:"center",
    overflow:"hidden"
}

export default contain(WelcomeScene, containerStyle)