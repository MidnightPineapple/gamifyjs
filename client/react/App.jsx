import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from './App.css'
import Router from './Router';

export default class App extends Component {

    render() { 
        return (
            <div className={styles.App} >
                <Router />
            </div>
        )
    }

}