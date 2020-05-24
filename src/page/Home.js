import React, {Component} from 'react';
import '../App.css';
import back from '../image/homeback.png'

class Home extends Component {
  render(){
    return (
      <div className="alignHome">
        {/*<img className="logo" src={back} aria-hidden alt="back image"></img>
        */}
        <div className="intro">
          이 웹페이지는 자신이 겪는 질병에 대한 증상을 체크하고,<br></br>
          그 증상과 가장 가까운 질병을 찾을 수 있는 웹사이트입니다.<br></br>
          증상과 가장 비슷한 질병명, 치료법, 진료병원 등을 알아볼 수 있으며<br></br>
          약학정보와 근처병원 혹은 약국 지도 정보도 제공합니다.<br></br>
        </div>
      </div>
    );
  }
}

export default Home;
