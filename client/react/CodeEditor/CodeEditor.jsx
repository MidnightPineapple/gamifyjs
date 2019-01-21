import React, { Component } from 'react';
import AceEditor from 'react-ace';
import styles from './CodeEditor.css';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

export default class CodeEditor extends Component {

    constructor(props) {
        super(props);

        this.props.messenger.setOnValueChangedCallback( ({ functionId, newText }) => {
            this.props.onChange(functionId, newText);
        }).setOnErrorCallback(() => this.forceUpdate());
    }

    onChange(value, event) {
        const { action, lines, start, end } = event;
        const { messenger } = this.props;
        switch(action) {
            case "insert":
                const text = lines.join("\n");
                messenger.insert(start.row, start.column, text);
                break;
            case "remove":
                messenger.remove(start.row, start.column, end.row, end.column);
                break;
        }

    }

    render() {
        return (
            <div className={styles.Container} >
                <AceEditor
                    mode="javascript"
                    theme="twilight"
                    name={this.props.name}
                    height="600px"
                    width="500px"
                    className={styles.AceEditor}
                    value={this.props.value}
                    onChange={this.onChange.bind(this)}
                    editorProps={{$blockScrolling: true}}
                    fontSize="1rem"
                />
            </div>
        )
    }

}