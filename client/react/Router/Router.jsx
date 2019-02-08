import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';

export default class Router extends Component {

    render() {
        return(
            <BrowserRouter>
                <Fragment>
                    <NavBar />
                    <Routes />
                </Fragment>
            </BrowserRouter>
        )
    }

} 