import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

class MedicineList extends Component {
  state = {
    drugsData: [],
  };

  // 서버에서 약학 정보 리스트를 가져옵니다
  getDrugData = async () => {
    const { setDrugs } = this.props;
    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/drugs`
    );
    setDrugs(result.data);
  };

  // 페이지가 마운트될 때 데이터를 불러옵니다
  componentDidMount() {
    this.getDrugData();
  }

  render() {
    const { drugs } = this.props;

    const drugList = drugs.map((drug) => (
      <DrugInfo name={drug.name} description={drug.description} key={drug.id} id={drug.id} />
    ));

    return (
      <div>
        <div className="listup">
          {drugList}
        </div>
      </div>
    );
  }
}

// 리스트의 각 항목
class DrugInfo extends Component {
  render() {
    return (
      <table className="listTable">
        <tr>
          <td>
            <Link to={{
              pathname: "/MDetail",
              state: {
                id: this.props.id,
              }
            }} className="name">{this.props.name}</Link>
          </td>
        </tr>
        <tr>
          {/* XSS 공격을 방지하는 기능을 해제해서 html을 그대로 렌더링합니다 */}
          <td dangerouslySetInnerHTML={{__html: this.props.description}}>
          </td>
        </tr>
      </table>
    );
  }
}

export default MedicineList;
