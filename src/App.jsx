import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import MenuBar from './components/MenuBar/MenuBar';
import styles from './App.module.scss';

const App = () => (
  <Router>
    <MenuBar />
    <main>
      <Segment className={styles.segment}>
        <Switch>
          <Route path="/auth" render={() => <div>Authentication</div>} />
          <Route path="/search" render={() => <div>Search</div>} />
          <Redirect to="/auth" />
        </Switch>
      </Segment>
    </main>
  </Router>
);

export default App;
