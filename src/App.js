import React, {Component} from 'react';
import './App.css';
import Header from './component/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CheckBoxContainer from "./container/CheckBoxContainer";
import ListUp from './page/ListUp';
import Detail from './page/Detail';
import Hospital from './page/Hospital';
import Parmacy from './page/Parmacy';
import Home from './page/Home';
import MDetail from './page/MDetail';
import MedicineContainer from "./container/MedicineContainer";

class App extends Component {
   render(){
    return (
      <div>
        <Router>
        <div className="viewContain">
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/CheckBox" component={CheckBoxContainer}></Route>
            <Route path="/ListUp" component={ListUp}></Route>
            <Route path="/Detail" component={Detail}></Route>
            <Route path="/Hospital" component={Hospital}></Route>
            <Route path="/Parmacy" component={Parmacy}></Route>
            <Route path="/Medicine" component={MedicineContainer}></Route>
            <Route path="/MDetail" component={MDetail}></Route>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
