import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import datetimeVisualizerBarChart from './datetimeVisualizerBarChart';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/view/:date' component={datetimeVisualizerBarChart} />
            <Route exact path='/' component={App} />
        </Switch>
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
