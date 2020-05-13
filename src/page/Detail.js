import React, { Component } from "react";
import '../App.css';
import disimage from '../image/disimage.png';

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            detailData: [
                {name: "복통", sym : "증상", cure: "치료", hos : "진료병원"}
            ]
        };
      }

    render(){
        return(
            <div className="contentalign">
                <div className="detailback">
                    {this.state.detailData.map((detailDes, i) => {
                    return (<DetailInfo name={detailDes.name}
                        sym={detailDes.sym}
                        cure={detailDes.cure}
                        hos={detailDes.hos}
                    key={i}/>);
                    })}
                  </div>
            </div>
        );
    }
}

class DetailInfo extends Component{
    render(){
      return(
        <table>
            <tr>
                <td className="detailTable" rowSpan="3"><img className="detailimage" src={disimage} aria-hidden alt="disimage"></img></td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.name}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.sym}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.cure}</td>
            </tr>
            <tr>
                <td className="detailTable">{this.props.hos}</td>
            </tr>
        </table>
      );
    }
  }
  
export default Detail;