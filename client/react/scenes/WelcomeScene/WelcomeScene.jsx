import React, { Component, Fragment } from 'react'
import styles from './WelcomeScene.css'
import Button from './LoginButton'

export default class WelcomeScene extends Component {
    
    render() {
        return(
            <Fragment>
                <header className={styles.header}>
                    <h1 className={styles.title}>GamifyJS</h1>
                </header>
                <div className={styles.loginOptions}>
                    <Button onClick = {() => alert("click")} type="primary">Login</Button>
                    <Button onClick = {() => alert("click")} type="info">New User</Button>
                </div>
            </Fragment>
        )
    }

}