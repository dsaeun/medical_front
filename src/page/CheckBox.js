import React, { Component } from "react";
import "../App.css";
import CheckSym from "../component/CheckSym";
import CheckPart from "../component/CheckPart";
import { PartConsumer, SymptomsConsumer } from "../container/CheckBoxContainer";
import { Link } from "react-router-dom";

class CheckBox extends Component {
  state = {
    part: "",
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
                {/**
                 * div 태그 안에 symptom 공백란 추가
                 */}
                {part ? <CheckSym partId={part}></CheckSym> : <div></div>}
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
  onDelete = () => {};

  render() {
    const symptomBoxList = this.props.symptoms.map((symptom, index) => (
      <div className="checkedBox" key={index}>
        {symptom.name} {symptom.part}
      </div>
    ));
    return <>{symptomBoxList}</>;
  }
}

export default CheckBox;
