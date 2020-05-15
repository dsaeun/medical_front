import React, {Component} from 'react';
import '../App.css';
import MedicineList from '../component/MedicineList';

class Medicine extends Component{
    state = {
        medicineName: ''
      }
      handleChange = (e) => {
        this.setState({
          medicineName: e.target.value //input에 onChange이벤트가 발생하면 e.target.value값을 통해 이벤트 객체에서 값을 읽어올수 있음.
        })
      }
      handleClick= (e) => {
        //검색 버튼을 클릭하면 위 input의 medicineName 혹은 input의 value를 가지고 DB에서 약정보 찾기
        alert('이거 어케 짜야하누,,,')
    }

    render(){
        return(
            <div className="contentalign">
                <h1>약학정보 찾기</h1>
                <div className="MedicineSearchDiv">
                    <input className="searchMedicine" type="text" placeholder="약 이름" value={this.state.medicineName} onChange={this.handleChange}/>
                    <button className="medicineBtn" onClick={this.handleClick}>Search</button>
                </div>
                <MedicineList></MedicineList>
            </div>
        );
    }
}

export default Medicine;