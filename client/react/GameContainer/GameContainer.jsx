import React, { Component } from 'react';
import styles from './GameContainer.css'
import CodeEditor from '../CodeEditor';
import { IFrameParentConnection } from '../lib'
import GameStateMessenger from './GameStateMessenger';

export default class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.frame = new IFrameParentConnection();
        this.gameStateManager = new GameStateMessenger(this.frame);
    }

    render() {
        return (
            <div className={styles.ContentContainer}>
                <iframe src={GAME_IFRAME_URI} className={styles.Frame} sandbox="allow-scripts allow-same-origin" />
                <CodeEditor frame={this.frame} />
            </div>
        )
    }

}