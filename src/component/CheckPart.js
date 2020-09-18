import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import dotenv from "dotenv";
import { PartConsumer } from "../container/CheckBoxContainer";

dotenv.config();

/**
 * CheckPart는 증상 정보 찾기 페이지에서 왼쪽 파트 리스트 출력 및 선택을 담당하는
 * 컴포넌트입니다. PartInfo는 파트 리스트의 각 항목 컴포넌트입니다. map 함수를 이용해서
 * 리스트 출력합니다.
 */

class CheckPart extends Component {
  state = {
    partData: [],
  };

  // 파트 리스트를 서버에 요청합니다
  getPartData = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/parts`);
    this.setState({
      partData: result.data,
    });
  };

  // 페이지가 마운트될 때 데이터를 불러옵니다
  componentDidMount() {
    this.getPartData();
  }

  render() {
    const { partData } = this.state;
    const partList = partData.map((part, index) => (
      <PartInfo name={part.name} key={index} partId={part.id}/>
    ));

    return (
      <div className="partstyle">
        <ul className="checklist">{partList}</ul>
      </div>
    );
  }
}

// Context API를 활용해서 주변 컴포넌트에게 static data를 공유합니다
class PartInfo extends Component {
  render() {
    return (
      <PartConsumer>
        {(value) => (
          <li className="checkli">
            <input
              type="radio"
              name="part"
              value={this.props.partId}
              onChange={(event) => {
                value.setPart(event.target.value);
              }}
            /><label>
            {this.props.name}
            </label>
          </li>
        )}
      </PartConsumer>
    );
  }
}

export default CheckPart;
