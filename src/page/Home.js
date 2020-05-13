import React, {Component} from 'react';
import '../App.css';
import Header from '../component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Checkbox from './Checkbox';
import Listup from './Listup';
import Detail from './Detail';

class Home extends Component {
  render(){
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/Checkbox" component={Checkbox}></Route>
            <Route path="/Listup" component={Listup}></Route>
            <Route path="/Detail" component={Detail}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
