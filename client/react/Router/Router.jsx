import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar/NavBar';

export default class Router extends Component {

    render() {
        return(
            <BrowserRouter>
                <Fragment>
                    <NavBar except={[ "/signup", "/" ]} />
                    <Routes />
                </Fragment>
            </BrowserRouter>
        )
    }

} 