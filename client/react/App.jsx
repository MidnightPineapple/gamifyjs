import React, { Component } from 'react';
import styles from './App.css'
import CodeEditor from './CodeEditor';
import { IFrameParentConnection } from './lib'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.frame = new IFrameParentConnection();
    }

    render() {
        return (
            <div className={styles.App} >
                <p>Hello from React!</p>
                <div className={styles.ContentContainer}>
                    <iframe src={GAME_IFRAME_URI} className={styles.Frame} sandbox="allow-scripts allow-same-origin" />
                    <CodeEditor frame={this.frame} />
                </div>
            </div>
        )
    }

}