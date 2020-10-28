import React, { Component } from 'react'
import '../App.css'
import MedicineList from '../component/MedicineList'
import { DrugsConsumer } from '../container/MedicineContainer'
import axios from 'axios'

class Medicine extends Component {
  state = {
    medicineName: '',
  }
  setKeyword = (event) => {
    this.setState({
      medicineName: event.target.value, //input에 onChange이벤트가 발생하면 e.target.value값을 통해 이벤트 객체에서 값을 읽어올수 있음.
    })
  }
  onSearch = async (setDrugs, initializeDrugs) => {
    const { medicineName } = this.state
    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/drugs?keyword=${medicineName}`
    )
    initializeDrugs()
    setDrugs(result.data)
  }

  render() {
    return (
      <DrugsConsumer>
        {({ drugs, setDrugs, initializeDrugs }) => (
          <div className="contentalign">
            <h1>약학정보 찾기</h1>

            <div class="box">
              <div class="container-1">
                <input
                  type="search"
                  id="search"
                  placeholder="Search..."
                  onChange={(event) => this.setKeyword(event)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      this.onSearch(setDrugs, initializeDrugs);
                    }
                  }}
                />
              </div>
            </div>

            {/*new search2 
<div class="box">
  <div class="container-2">
      <span class="icon"><i class="fa fa-search"></i></span>
      <input type="search" id="search" placeholder="Search..." />
  </div>
</div>
*/}
            {/* 
            <div class="search-box">
      <input type="text" class="search-txt" name=""placeholder="Type to search"/>
      <a class="search-btn" href="#">
        <i class="fas fa-search"></i>
      </a>
    </div>

*/}
            {/*
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
</div>*/}
            <MedicineList drugs={drugs} setDrugs={setDrugs}/>
          </div>
        )}
      </DrugsConsumer>
    )
  }
}

export default Medicine
