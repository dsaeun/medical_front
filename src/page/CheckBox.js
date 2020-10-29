import React, { Component } from "react";
import "../App.css";
import CheckSym from "../component/CheckSym";
import CheckPart from "../component/CheckPart";
import { PartConsumer, SymptomsConsumer } from "../container/CheckBoxContainer";
import { Link } from "react-router-dom";
import _ from "lodash"

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
              <div className="contentalign checkBoxHome">
                <h1>증상정보 찾기</h1>
                <div className="checkedContainer">{!_.isEmpty(symptoms) && <Checked symptoms={symptoms}></Checked>}</div>
                <CheckPart></CheckPart>
                {part && (
                  <CheckSym partId={part}></CheckSym>
                )}
                <div className="SearchBtnDiv">
                <button className="SearchButton">
                  <Link
                    to={
                      !_.isEmpty(symptoms)
                        ? {
                            pathname: "/ListUp",
                            state: {
                              symptoms,
                            },
                          }
                        : "#"
                    }
                  >
                    Search
                  </Link>
                </button>
                </div>
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
              <button
                className="removeBtn"
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
