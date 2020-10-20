import React, { Component, createContext } from "react";
import CheckBox from "../page/CheckBox";

const PartContext = createContext({
  part: "",
  setPart: (part) => {},
});
const SymptomsContext = createContext({
  symptoms: [],
  setSymptoms: (symptom) => {},
  removeSymptoms: (symptom) => {},
});

class PartProvider extends Component {
  constructor(props) {
    super(props);

    this.setPart = (part) => {
      this.setState({
        part,
      });
    };

    this.state = {
      part: "",
      setPart: this.setPart,
    };
  }

  render() {
    return (
      <PartContext.Provider value={this.state}>
        {this.props.children}
      </PartContext.Provider>
    );
  }
}

class SymptomsProvider extends Component {
  constructor(props) {
    super(props);

    this.setSymptoms = (symptom) => {
      for (let symptomIndex of this.state.symptoms) {
        if (symptomIndex.id === symptom.id) {
          return;
        }
      }
      let nextArray = this.state.symptoms.concat(symptom);
      this.setState({
        symptoms: nextArray,
      });
    };

    this.removeSymptoms = (symptom) => {
      let nextArray = this.state.symptoms.filter(
        (symptomIndex) => symptomIndex.id !== symptom.id
      );
      this.setState({
        symptoms: nextArray,
      });
    };

    this.state = {
      symptoms: [],
      setSymptoms: this.setSymptoms,
      removeSymptoms: this.removeSymptoms,
    };
  }

  render() {
    return (
      <SymptomsContext.Provider value={this.state}>
        {this.props.children}
      </SymptomsContext.Provider>
    );
  }
}

class CheckBoxContainer extends Component {
  render() {
    return (
      <PartProvider>
        <SymptomsProvider>
          <CheckBox />
        </SymptomsProvider>
      </PartProvider>
    );
  }
}

export const { Consumer: PartConsumer } = PartContext;
export const { Consumer: SymptomsConsumer } = SymptomsContext;

export default CheckBoxContainer;
