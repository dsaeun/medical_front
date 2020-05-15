import React, { Component } from "react";
import '../App.css';
import disimage from '../image/disimage.png';

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            medicineData: [
                {Mname: "복통", dis:"쓰이는 병명", eat:"복용법", effect:"효과"}
            ]
        };
      }

    render(){
        return(
            <div className="contentalign">
                <div className="detailback">
                    {this.state.medicineData.map((mediDes, i) => {
                    return (<MedicineInfo Mname={mediDes.Mname}
                        dis={mediDes.dis}
                        eat={mediDes.eat}
                        effect={mediDes.effect}
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
        <table>
            <tr>
                <td className="detailTable" rowSpan="3"><img className="detailimage" src={disimage} aria-hidden alt="disimage"></img></td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.Mname}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.dis}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.eat}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.effect}</td>
            </tr>
        </table>
      );
    }
  }
  
export default Detail;