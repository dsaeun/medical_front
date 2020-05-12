import React, {Component} from 'react';
import '../App.css';
import Checkpart from '../component/checkpart';
import Checksym from '../component/checksym';

class Checkbox extends Component {
  render(){
    return (
      <div className="contentalign">
        <Checkpart></Checkpart>
        <Checksym></Checksym>
      </div>
    );
  }
}

export default Checkbox;
