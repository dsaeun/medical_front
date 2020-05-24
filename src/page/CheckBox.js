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
                <div>
                  {symptoms && <Checked symptoms={symptoms}></Checked>}
                </div>
                <CheckPart></CheckPart>
                {part ? <CheckSym partId={part}></CheckSym> : <div className="white"></div>}
                <button className="SearchButton">
                  <Link
                    to={{
                      pathname: "/ListUp",
                      state: {
                        symptoms,
                      },
                    }}
                  >
                    Search
                  </Link>
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
  render() {
    const { symptoms } = this.props;
    return (
      <SymptomsConsumer>
        {({ removeSymptoms }) =>
          symptoms.map((symptom, index) => (
            <div className="checkedBox" key={index}>
              {symptom.name}
              <button className="removeBtn"
                onClick={() => {
                  removeSymptoms(symptom);
                }}
              >
                X
              </button>
            </div>
          ))
        }
      </SymptomsConsumer>
    );
  }
}

export default CheckBox;
