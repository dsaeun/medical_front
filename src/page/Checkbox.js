import React, {Component} from 'react';
import '../App.css';
import Checksym from '../component/Checksym';
import Checkpart from '../component/Checkpart';
import {Link} from "react-router-dom";

class Checkbox extends Component {

  handleClick = () => {
    //save 버튼을 누르면 이벤트로 sym의 정보를 변수에 저장.
    //저장한 변수를 아래 Checked 클래스의 <div>안에 넣어서 증상정보 찾기 타이틀 아래에 뜨게,,
  }

  render(){
    return (
      <div className="contentalign">
        <h1>증상정보 찾기</h1>
        <Checked></Checked>
        <Checkpart></Checkpart>
        <Checksym></Checksym>
        <button onClick={this.handleClick} className="saveSearchButton">Save</button>
        <button className="saveSearchButton"><Link to="./Listup">Search</Link></button>
      </div>
    );
  }
}

class Checked extends Component{
  render(){
    return(
      <div className="checkedBox">
        {/*handleClick통해 받아온 sym정보를 여기에 넣어서 반복시킴*/}
      </div>
    );
  }
}

export default Checkbox;