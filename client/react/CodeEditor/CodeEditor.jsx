import React, { Component } from 'react';
import AceEditor from 'react-ace';
import styles from './CodeEditor.css';

import 'brace/mode/javascript';
import 'brace/theme/twilight';

export default class CodeEditor extends Component {

    setCallbacks() {
        const changeCallback = ({ functionId, newText }) => {
            this.props.onChange(functionId, newText);
        }
    
        const errorCallback = () => this.forceUpdate()

        this.props.messenger
        .setOnValueChangedCallback(changeCallback)
        .setOnErrorCallback(errorCallback)
    }

    componentDidMount() {
        this.setCallbacks();
    }

    componentDidUpdate(prevProps) {
        if(this.props.messenger !== prevProps.messenger) {
            this.setCallbacks();
        }
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
                    height="inherit"
                    width="inherit"
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