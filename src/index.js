import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import datetimeVisualizerBarChart from './datetimeVisualizerBarChart';
import sensorVisualizerLineChart from './sensorVisualizerLineChart';
import allDataInChart from './allDataInChart';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/view/:date' component={datetimeVisualizerBarChart} />
            <Route exact path='/sensor/:no' component={sensorVisualizerLineChart} />
            <Route exact path='/data' component={allDataInChart} />
            <Route exact path='/' component={App} />
        </Switch>
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
