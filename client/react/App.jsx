import React, { Component } from 'react';
import styles from './App.css'
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

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
    }   

    editorOnChange(editorText, event) {
        this.setState({ editorText });

        // event { start,end:{line,column} lines:[ affected lines ] action:(insert|remove) }
    }

    render() {

        return (
            <div className="app" >
                <p>Hello from React!</p>
                <AceEditor
                mode="javascript"
                theme="twilight"
                name="Editor Name Here"
                height="6em"
                value={this.state.editorText}
                onChange = {this.editorOnChange.bind(this)}
                />
                <iframe src={GAME_IFRAME_URI} className={styles.frame} sandbox="allow-scripts allow-same-origin" />
            </div>
        )
    }

}