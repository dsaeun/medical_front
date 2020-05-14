import React, {Component} from 'react';
import '../App.css';
import Header from '../component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Checkbox from './Checkbox';
import Listup from './Listup';
import Detail from './Detail';
import Hospital from './Hospital';
import Parmacy from './Parmacy';
import Medicine from './Medicine.js';

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
            <Route path="/Hospital" component={Hospital}></Route>
            <Route path="/Parmacy" component={Parmacy}></Route>
            <Route path="/Medicine" component={Medicine}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
