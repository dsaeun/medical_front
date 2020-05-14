import React, {Component} from 'react';
import '../App.css';

class Medicine extends Component{
    render(){
        return(
            <div className="contentalign">
                <h1>약학정보 찾기</h1>
                <div className="MedicineSearchDiv">
                    <input className="searchMedicine" type="text"/>
                    <button className="medicineBtn">Search</button>
                </div>
            </div>
        );
    }
}

export default Medicine;