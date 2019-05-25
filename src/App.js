import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './container/Home';
import NotFound from './container/NotFound';

import './asset/scss/style.scss';


export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route path="/author/:id" component={Author} /> */}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}