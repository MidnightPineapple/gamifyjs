import React, { Component } from 'react';
import styles from './App.css'
import GameContainer from './GameContainer';

export default class App extends Component {

    render() {
        return (
            <div className={styles.App} >
                <p>Hello from React!</p>
                <GameContainer />
            </div>
        )
    }

}