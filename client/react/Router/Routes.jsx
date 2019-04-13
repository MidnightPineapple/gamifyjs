import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GameScene, NotFoundScene, WelcomeScene, DashboardScene, ProfileScene, SignUpScene } from '../scenes';
import contain from '../ContentContainer';

export default class Routes extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/" component={WelcomeScene} />
                <Route exact path="/dashboard" component={DashboardScene} />
                <Route exact path="/profile" component={ProfileScene} />
                <Route exact path="/signup" component={SignUpScene} />
                <Route exact path="/game" component={contain(GameScene)} />
                <Route component={contain(NotFoundScene)} />
            </Switch>
        )
    }

} 