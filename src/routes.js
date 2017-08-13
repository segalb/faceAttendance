import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import LecturesView from './containers/LecturesView';
import Dashboard from './containers/DashboardPage';
// import StaticImage from './components/dashboard/StaticImage';

export default(
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="form" component={FormPage}/>
      <Route path="table" component={TablePage}/>
      <Route path="LecturesView/:value" component={LecturesView}/>
      <Route path="*" component={NotFoundPage}/> {/* <Route path = "*" component ={StaticImage} /> */}
    </Route>
  </Route>
);
