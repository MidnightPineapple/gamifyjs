import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GameScene, NotFoundScene, WelcomeScene } from '../scenes';
import contain from '../ContentContainer';

export default class Routes extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/" component={contain(WelcomeScene)} />
                <Route path="/game" component={contain(GameScene)} />
                <Route component={contain(NotFoundScene)} />
            </Switch>
        )
    }

} 