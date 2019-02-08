import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundScene.css'

export default class NotFoundScene extends Component {

    render() {
        return(
            <header style={styles.header}>
                <i className={"fas fa-heart-broken "+styles.icon}></i>
                <h1 className={styles.title}>Oops we couldn't find that.</h1>
                <Link className={styles.link} to="/">Back To Homepage</Link>                
            </header>
        )
    }

} 