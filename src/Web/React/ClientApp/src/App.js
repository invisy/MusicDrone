import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
