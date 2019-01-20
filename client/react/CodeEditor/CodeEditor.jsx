import React, { Component } from 'react';
import AceEditor from 'react-ace';
import styles from './CodeEditor.css';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

export default class CodeEditor extends Component {

    constructor(props) {
        super(props);

        // TODO: remember to set a listener to errors to be this.props.onChange. don't run it in the actual onChange function in Ace 
    }

    onChange(value, event) {

        const { action, lines, start, end } = event;
        const { messenger } = this.props;
        switch(action) {
            case "insert":
                const text = lines.join("\n");
                messenger.insert(start.line, start.column, text);
                break;
            case "remove":
                messenger.remove(start.line, start.column, end.line, end.column);
                break;
        }

        // ! FOR DEBUG
        this.props.onChange(value,event)
    }

    render() {
        return (
            <div className={styles.AceEditorContainer} >
                <AceEditor
                    mode="javascript"
                    theme="twilight"
                    name={this.props.name}
                    height="600px"
                    width="800px"
                    className={styles.AceEditor}
                    value={this.props.value}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        )
    }

}