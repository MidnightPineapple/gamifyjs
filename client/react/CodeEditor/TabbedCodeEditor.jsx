import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import EditorMessenger from './EditorMessenger';
import styles from './TabbedCodeEditor.css';

const classNames = (...args) => args.join(" ");

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
        // IDEA: might wanna send an editor close event so we undo the event listeners in the game
        const newState = this.state.functions.slice();
        newState.splice(key,1);
        let newCursor = this.state.cursor - 1;
        if(newCursor < 0 && newState.length > 0) {
            newCursor = 0;
        }
        this.setState({ functions: newState, cursor: newCursor })
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
                { 
                    functions.map( (f,k) => (
                        <Tab key={k} 
                        focus={cursor===k} 
                        displayName={f.displayName} 
                        onClick={ ()=>this.focusOnFunction(k) } 
                        onClose={ ()=>this.closeTab(k) }/> 
                    )) 
                }
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

const Tab = ({ focus, onClick, onClose, displayName}) => (
    <li className={classNames(styles.Tab, focus?styles.Active:styles.Inactive)}>
        <button 
        onClick={onClick} 
        className={styles.TabButton} >
            { displayName }
        </button>
        <button
        onClick={onClose}
        className={styles.TabButton}>
            &times;
        </button>

    </li>
)

// ! BUG: when I switch tabs and switch back, somehow the second tab reverts to default value? but linked function has appropraite state still...