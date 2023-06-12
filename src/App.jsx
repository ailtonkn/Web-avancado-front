import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Sobre from './Sobre';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sobre" component={Sobre} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

