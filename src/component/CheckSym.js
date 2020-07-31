import React, { Component } from "react";
import { SymptomsConsumer } from "../container/CheckBoxContainer";
import axios from "axios";

class CheckSym extends Component {
  state = {
    symptomData: [],
    partId: "",
    keyword: "",
  };

  getSymptomData = async () => {
    const { partId } = this.props;
    const { keyword } = this.state;

    // 검색 키워드가 존재한다면 쿼리 스트링에 검색 키워드를 포함합니다
    const queryString = keyword ? `partId=${partId}&keyword=${keyword}` : `partId=${partId}`;

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/symptoms?${queryString}`
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
      return <SymInfo
          sym={symptom.name}
          key={index}
          symId={symptom.id}
          symPart={partId}
      />;
    });

    return (
      <div className="symstyle">
        <input className="searchSymptom" type="text" onChange={(event) => {
          this.setState({
            keyword: event.target.value,
          });
        }}/>
        <button className="SymptomBtn" onClick={this.getSymptomData}>Search</button>
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
