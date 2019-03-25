import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GameScene, NotFoundScene, WelcomeScene, DashboardScene } from '../scenes';
import contain from '../ContentContainer';

export default class Routes extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/" component={WelcomeScene} />
                <Route exact path="/dashboard" component={DashboardScene} />
                <Route path="/game" component={contain(GameScene)} />
                <Route component={contain(NotFoundScene)} />
            </Switch>
        )
    }

} 