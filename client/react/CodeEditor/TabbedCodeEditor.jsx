import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import EditorMessenger from './EditorMessenger';
import styles from './TabbedCodeEditor.css';

const classNames = (...args) => args.join(" ");

export default class TabbedCodeEditor extends Component {

    constructor(props) {
        super(props)
        this.messenger = new EditorMessenger(this.props.frame)
        .onReceiveFunction(({ functionId, text, parameters, displayName }) => {
            const existingFun = this.state.functions.find(f=>f.functionId === functionId)
            if(!existingFun) {
                this.newFunction(functionId, text, parameters, displayName);
            } else {
                const idx = this.state.functions.indexOf(existingFun);
                this.focusOnFunction(idx);
            }
        }).onError(({ functionId, errorMessage }) => {
            this.newError(errorMessage);
        }).onRevokeFunction(({ functionId }) => {
            const existingFun = this.state.functions.find(f=>f.functionId === functionId)
            if(existingFun) {
                const idx = this.state.functions.indexOf(existingFun);
                this.closeTab(idx);
            }
        })

        this.state = {
            functions: [],
            cursor:-1,
            errors:[],
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

    renderBlankEditor() {
        return (
            <div className={styles.BlankEditor}>
                <p>No functions here yet.</p>
                <p>¯\_(ツ)_/¯</p>
            </div>
        )
    }

    newError(errMsg) {
        const newState = this.state.errors.slice();
        newState.push(errMsg);
        this.setState({ errors: newState });
    }

    dismissError() {
        const newState = this.state.errors.slice();
        newState.pop();
        this.setState({ errors: newState });
    }

    render() {

        const { functions, cursor, errors } = this.state;

        return (
            <div className={styles.Container}>
                { this.renderTabs(functions, cursor) }
                { functions.length > 0 ? this.renderEditor(functions, cursor) : this.renderBlankEditor() }
                { errors.length > 0 && <ErrorToast message={errors[errors.length-1]} onDismiss={this.dismissError.bind(this)} />}
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

const ErrorToast = ({ message, onDismiss }) => (
    <div className={styles.ErrorToast}>
        <p>{ message }</p>
        <button onClick={onDismiss}>Dismiss</button>
    </div>
)