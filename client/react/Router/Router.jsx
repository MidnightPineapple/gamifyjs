import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar/NavBar';

export default class Router extends Component {

    render() {
        return(
            <BrowserRouter>
                <Fragment>
                    <Route path="/:route+" component={NavBar}/>
                    <Routes />
                </Fragment>
            </BrowserRouter>
        )
    }

} 