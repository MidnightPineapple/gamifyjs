import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GameScene, NotFoundScene, WelcomeScene } from '../scenes';

export default class Routes extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/" component={WelcomeScene} />
                <Route path="/game" component={GameScene} />
                <Route component={NotFoundScene} />
            </Switch>
        )
    }

} 