import React, { Component } from "react";
import "../App.css";
import CheckSym from "../component/CheckSym";
import CheckPart from "../component/CheckPart";
import { PartConsumer, SymptomsConsumer } from "../container/CheckBoxContainer";
import { Link } from "react-router-dom";

class Checkbox extends Component {
  state = {
    part: "",
  };

  handleClick = () => {
    //save 버튼을 누르면 이벤트로 sym의 정보를 변수에 저장.
    //저장한 변수를 아래 Checked 클래스의 <div>안에 넣어서 증상정보 찾기 타이틀 아래에 뜨게,,
  };

  render() {
    return (
      <PartConsumer>
        {({ part }) => (
          <SymptomsConsumer>
            {({ symptoms }) => (
              <div className="contentalign">
                <h1>증상정보 찾기</h1>
                {symptoms && <Checked symptoms={symptoms}></Checked>}
                <CheckPart></CheckPart>
                {/*part 선택자 하나를 리턴 */}
                {part && <CheckSym partId={part}></CheckSym>}
                <button onClick={this.handleClick} className="saveSearchButton">
                  Save
                </button>
                <button className="saveSearchButton">
                  <Link to="./Listup">Search</Link>
                </button>
              </div>
            )}
          </SymptomsConsumer>
        )}
      </PartConsumer>
    );
  }
}

class Checked extends Component {
  onDelete = () => {

  };

  render() {
    const symptomBoxList = this.props.symptoms.map((symptom, index) => (
      <div className="checkedBox" key={index}>
        {symptom.name} {symptom.part}
      </div>
    ));
    return <>{symptomBoxList}</>;
  }
}

export default Checkbox;
