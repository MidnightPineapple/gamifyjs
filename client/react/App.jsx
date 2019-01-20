import React, { Component } from 'react';
import styles from './App.css'
import CodeEditor, { EditorMessenger } from './CodeEditor';
import { IFrameParentConnection } from './lib'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorText:""
        }
        
    }
    
    componentDidMount() {
        this.frame = new IFrameParentConnection();
        this.messenger = new EditorMessenger(this.frame, "abcd")
        this.forceUpdate();
    }   

    editorOnChange(editorText, event) {
        this.setState({ editorText });

    }

    render() {

        return (
            <div className={styles.App} >
                <p>Hello from React!</p>
                <CodeEditor
                value={this.state.editorText}
                onChange = {this.editorOnChange.bind(this)}
                messenger = {this.messenger}
                />
                <iframe src={GAME_IFRAME_URI} className={styles.Frame} sandbox="allow-scripts allow-same-origin" />
            </div>
        )
    }

}