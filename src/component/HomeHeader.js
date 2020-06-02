import React, {Component} from 'react';
import '../App.css';
import logo from '../image/logo.png';
import {Link} from "react-router-dom";

class HomeHeader extends Component {
  render(){
    return (
      <header className="homeMenu">
        <div className="homeMenuList">
          <Link to="./Home"><img className="logo" src={logo} aria-hidden alt="logo image"></img></Link>
          <ul>
            <li><Link to="./Checkbox">증상정보 찾기</Link></li>
            <li><Link to="./Medicine">약학정보 찾기</Link></li>
            <li><Link to="./Hospital">근처병원 찾기</Link></li>
            <li className="findParmacy"><Link to="./Parmacy">근처약국 찾기</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default HomeHeader;
