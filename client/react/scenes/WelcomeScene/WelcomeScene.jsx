import React, { Component } from 'react';
import styles from './WelcomeScene.css';

export default class WelcomeScene extends Component {
    
    render() {
        return(
            <header className={styles.header}>
                <h1 className={styles.title}>Welcome to my website</h1>
                <h3 className={styles.subtitle}>Come right in</h3>
            </header>
        )
    }

}