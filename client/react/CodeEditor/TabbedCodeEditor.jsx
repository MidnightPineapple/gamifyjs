import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import EditorMessenger from './EditorMessenger';
import styles from './TabbedCodeEditor.css';

export default class TabbedCodeEditor extends Component {

    // // 4. figure out where I'm storing function text and where I'm gonna set the text of the editor to a new value

    // 4.5 style the editor and tabs better. ie bg colors, sth to fill empty space, actual tabs

    // // ! 5. Don't forget to implement the "insert" and "remove" listeners inside the FunctionMessenger

    // 6. add an error listener & snackbar

    constructor(props) {
        super(props)
        this.messenger = new EditorMessenger(this.props.frame)
        .onReceiveFunction(({ functionId, text, parameters, displayName }) => {
            this.newFunction(functionId, text, parameters, displayName);
        })

        this.state = {
            functions: [],
            cursor:-1,
        }

    }

    newFunction(functionId, text, parameters, displayName) {
        const newState = this.state.functions.slice();
        newState.push({
            functionId, 
            text, 
            parameters, 
            displayName,
            messenger: this.messenger.forId(functionId),
        });
        this.setState({ functions: newState, cursor: newState.length - 1 });
    }

    focusOnFunction(cursor) {
        this.setState({ cursor });
    }

    updateFunctionText(funId, newText) {
        const newState = this.state.functions.slice();
        const idx = newState.indexOf(newState.find( f => f.functionId === funId ));
        if(idx < 0) throw new Error("Can't find function "+funId+" for update");
        const newFun = Object.assign({}, newState[idx]);
        newFun.text = newText;
        newState[idx] = newFun;
        this.setState({ functions: newState });

    }

    closeTab(key) {
        // TODO: put the button in for this first
    }

    renderEditor(functions, cursor) {
        const { text, parameters, messenger } = functions[cursor];
        return (
            <CodeEditor
                value = {text}
                onChange = {this.updateFunctionText.bind(this)}
                messenger = {messenger}
            />
        )
    }

    renderTabs(functions, cursor) {
        return (
            <ul className={styles.TabContainer}>
                { functions.map( (f,k) => <Tab key={k} highlight={cursor===k} displayName={f.displayName} onClick={ ()=>this.focusOnFunction(k) } /> ) }
            </ul>
        )
    }

    render() {

        const { functions, cursor } = this.state;

        return (
            <div className={styles.Container}>
                { this.renderTabs(functions, cursor) }
                { functions.length > 0 && this.renderEditor(functions, cursor) /* If no functions, render empty or no func page here */ }
            </div>
        )
    }

}

const Tab = props => (
    <li className={styles.TabContainer}>
        <button onClick={props.onClick} className={styles.TabButton}>{ props.displayName }</button>
    </li>
)