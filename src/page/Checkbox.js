import React, {Component} from 'react';
import '../App.css';
import Checksym from '../component/checksym';
import {Link} from "react-router-dom";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        partData: [
            {part : "머리"},
            {part : "배"}
        ]
    };
  }

  render(){
    return (
      <div className="contentalign">
        <h1>증상정보 찾기</h1>
        <div className="partstyle">
          <ul className="checklist">
            {this.state.partData.map((partDes, i) => {
              return (<PartInfo part={partDes.part}
                key={i}/>);
                })}
          </ul>
        </div>
        <Checksym></Checksym>
        <button>Save</button>
        <button><Link to="./Listup">Search</Link></button>
      </div>
    );
  }
}

class PartInfo extends Component{
  render(){
    return(
      <li className="checkli">
        <input type="radio" name="part" value={this.props.part}/>{this.props.part}
      </li>
    );
  }
}

export default Checkbox;
