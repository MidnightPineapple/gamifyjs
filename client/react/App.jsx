import React, { Component } from 'react';
import styles from './App.css'

export default class App extends Component {

    render() {

        return (
            <div className="app" >
                <p>Hello from React!</p>
                <iframe src={GAME_IFRAME_URI} className={styles.frame} sandbox />
            </div>
        )
    }

}