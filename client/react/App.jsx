import React, { Component } from 'react';
import styles from './App.css'

import { IFrameParentConnection } from './lib'

export default class App extends Component {

    componentDidMount() {
        this.frame = new IFrameParentConnection();
    }

    render() {

        return (
            <div className="app" >
                <p>Hello from React!</p>
                <iframe src={GAME_IFRAME_URI} className={styles.frame} sandbox="allow-scripts allow-same-origin" />
            </div>
        )
    }

}