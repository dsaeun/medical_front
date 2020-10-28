import React, { Component } from "react";
import { SymptomsConsumer } from "../container/CheckBoxContainer";
import axios from "axios";

/**
 * CheckSym은 증상 정보 찾기 페이지에서 오른쪽 증상 리스트 출력 및 선택을 담당하는
 * 컴포넌트입니다. SymInfo는 증상 리스트의 각 항목 컴포넌트입니다. map 함수를 이용해서
 * 리스트 출력합니다.
 */

class CheckSym extends Component {
  state = {
    symptomData: [],
    partId: "",
    keyword: "",
  };

  // 서버에 증상 리스트를 요청합니다
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

  // 페이지가 마운트될 때 데이터를 불러옵니다
  componentDidMount() {
    this.getSymptomData();
  }

  // 라디오 버튼 해제 관련 로직 - 미완성
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
        <div className="box">
        <div class="container-sym">
      <input type="search" id="search" placeholder="Search..." />
      </div>
  </div>

{/*기존 input
        <input className="searchSymptom" type="text" onChange={(event) => {
          this.setState({
            keyword: event.target.value,
          });
        }}/>
        <button className="SymptomBtn" onClick={this.getSymptomData}>Search</button>
        */}
        <div>
        <ul className="checklist">{symptomList}</ul>
        </div>
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
