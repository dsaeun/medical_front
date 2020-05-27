import React, { Component } from "react";
import { SymptomsConsumer } from "../container/CheckBoxContainer";
import axios from "axios";

class CheckSym extends Component {
  state = {
    symptomData: [],
    partId: "",
  };

  getSymptomData = async () => {
    const { partId } = this.props;
    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/symptoms?part_ids=${partId}`
    );
    this.setState({
      symptomData: result.data,
    });
  };

  componentDidMount() {
    this.getSymptomData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.partId !== prevProps.partId) {
      this.getSymptomData();
    }
  }

  render() {
    const { symptomData } = this.state;
    const { partId } = this.props;
    const symptomList = symptomData.map((symptom, index) => {
      return <SymInfo sym={symptom.name} key={index} symId={symptom.id} symPart={partId} />;
    });

    return (
      <div className="symstyle">
        <ul className="checklist">{symptomList}</ul>
      </div>
    );
  }
}

class SymInfo extends Component {
  render() {
    const { sym, symId, symPart } = this.props;
    return (
      <SymptomsConsumer>
        {({ symptoms, setSymptoms }) => (
          <li className="checkli">
            <input
              type="radio"
              name="sym"
              value={symId}
              onChange={(event) => {
                setSymptoms({
                  id: event.target.value,
                  name: sym,
                  part: symPart,
                });
              }}
            /><label>
            {sym}
            </label>
          </li>
        )}
      </SymptomsConsumer>
    );
  }
}

export default CheckSym;
