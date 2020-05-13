import React, { Component } from "react";
import '../App.css';
import disimage from '../image/disimage.png';
import {Link} from "react-router-dom";

class Listup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listupData: [
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"},
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"},
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"},
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"},
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"}
            ]
        };
      }

    render(){
        return(
            <div className="contentalign">
                <h1>의심 증상</h1>
                <div className="listup">
                    {this.state.listupData.map((listDes, i) => {
                return (<ListupInfo name={listDes.name}
                    sym={listDes.sym}
                  key={i}/>);
                  })}
                </div>
            </div>
        );
    }
}


class ListupInfo extends Component{
    render(){
      return(
        <table className="listTable">
            <tr>
                <td rowSpan="3"><img className="disimage" src={disimage} aria-hidden alt="disimage"></img></td>
            </tr>
            <tr>
                <td><Link to="./Detail">{this.props.name}</Link></td>
            </tr>
            <tr>
                <td>{this.props.sym}</td>
            </tr>
        </table>
      );
    }
  }
  

export default Listup;