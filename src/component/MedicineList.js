import React, { Component } from "react";
import '../App.css';
import disimage from '../image/disimage.png';
import {Link} from "react-router-dom";

class MedicineList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            medicineData: [
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"},
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"},
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"},
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"},
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"}
            ]
        };
      }

    render(){
        return(
            <div>
                <div className="listup">
                    {this.state.medicineData.map((mediDes, i) => {
                return (<MedicineInfo Mname={mediDes.Mname}
                    dis={mediDes.dis}
                  key={i}/>);
                  })}
                </div>
            </div>
        );
    }
}


class MedicineInfo extends Component{
    render(){
      return(
        <table className="listTable">
            <tr>
                <td rowSpan="3"><img className="disimage" src={disimage} aria-hidden alt="disimage"></img></td>
            </tr>
            <tr>
                <td><Link to="./MDetail">{this.props.Mname}</Link></td>
            </tr>
            <tr>
                <td>{this.props.dis}</td>
            </tr>
        </table>
      );
    }
  }
  

export default MedicineList;