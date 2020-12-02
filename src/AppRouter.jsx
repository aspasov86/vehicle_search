import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MenuBar from './components/MenuBar/MenuBar';
import SearchPage from './components/SearchPage/SearchPage';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';

const AppRouter = () => (
  <Router>
    <MenuBar />
    <main>
      <Layout>
        <Switch>
          <Route path="/auth" component={Login} />
          <ProtectedRoute path="/search" component={SearchPage} />
          <Redirect to="/auth" />
        </Switch>
      </Layout>
    </main>
  </Router>
);

export default AppRouter;
