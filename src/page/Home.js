import React, {Component} from 'react';
import '../App.css';
import Header from '../component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Checkbox from './Checkbox';

class Home extends Component {
  render(){
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/Checkbox" component={Checkbox}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
