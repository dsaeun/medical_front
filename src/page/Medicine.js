import React, { Component } from "react";
import "../App.css";
import MedicineList from "../component/MedicineList";
import { DrugsConsumer } from "../container/MedicineContainer"
import axios from 'axios'

class Medicine extends Component {
  state = {
    medicineName: "",
  };
  setKeyword = (event) => {
    this.setState({
      medicineName: event.target.value, //input에 onChange이벤트가 발생하면 e.target.value값을 통해 이벤트 객체에서 값을 읽어올수 있음.
    });
  };
  onSearch = async (setDrugs, initializeDrugs) => {
    const { medicineName } = this.state;
    const result = await axios.get(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/drugs?keyword=${medicineName}`
    );
    initializeDrugs();
    setDrugs(result.data);
  };

  render() {
    return (
      <DrugsConsumer>
        {({ drugs, setDrugs, initializeDrugs }) => (
          <div className="contentalign">
            <h1>약학정보 찾기</h1>
            <div className="MedicineSearchDiv">
              <input
                className="searchMedicine"
                type="text"
                placeholder="약 이름"
                onChange={(event) => this.setKeyword(event)}
              />
              <button className="medicineBtn" onClick={() => this.onSearch(setDrugs, initializeDrugs)}>
                Search
              </button>
            </div>
            <MedicineList drugs={drugs} setDrugs={setDrugs}></MedicineList>
          </div>
        )}
      </DrugsConsumer>
    );
  }
}

export default Medicine;
