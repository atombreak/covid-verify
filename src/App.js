import'./main.css';
import React, { Component, Suspense, lazy } from 'react';
import { Switch as Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Loader from './Loader.js';

import { Context } from './data-context.js';

const Header = lazy(e => import('./Header.js'));
const Verify = lazy(e => import('./Verify'));
const Generate = lazy(e => import('./Generate.js'));
const ViewCode = lazy(e => import('./ViewCode.js'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        i: 0,
        incrementI: e => {
          this.setState({ i: this.state.i+1 });
        }
    }
    
  }

  hello() {

  }

  render () {
  return (
    <Context.Provider value={this.state}>
    <Router>
    <Suspense fallback={<Loader />}>
    <Routes>
    <Route exact path='/'>
    <Header> </Header>
    </Route>
    <Route exact path='/verify'>
    <Verify> </Verify>
    </Route>
    <Route exact path='/generate'>
    <Generate />
    </Route>
    <Route path='/view-code'>
    <ViewCode />
    </Route>
    <Route path='*'>
      <p> 404 </p>
    </Route>
    </Routes>
    </Suspense>
    </Router>
    </Context.Provider>
  );
}
}

export default App;
