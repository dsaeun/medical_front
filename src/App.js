import React, {Component} from 'react';
import './App.css';
import Header from './component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CheckBoxContainer from "./container/CheckBoxContainer";
import Listup from './page/Listup';
import Detail from './page/Detail';
import Hospital from './page/Hospital';
import Parmacy from './page/Parmacy';
import Medicine from './page/Medicine';
import Home from './page/Home';
import MDetail from './page/MDetail';

class App extends Component {
  render(){
    return (
      <div>
        <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/Checkbox" component={CheckBoxContainer}></Route>
            <Route path="/Listup" component={Listup}></Route>
            <Route path="/Detail" component={Detail}></Route>
            <Route path="/Hospital" component={Hospital}></Route>
            <Route path="/Parmacy" component={Parmacy}></Route>
            <Route path="/Medicine" component={Medicine}></Route>
            <Route path="/MDetail" component={MDetail}></Route>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
