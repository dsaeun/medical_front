import React, { Component } from "react";
import "../App.css";
import disimage from "../image/disimage.png";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";

dotenv.config();

class ListUp extends Component {
  state = {
    diseasesData: [],
  };

  getDiseasesData = async () => {
    const { symptoms } = this.props.location.state;
    const symptom_ids = [];
    for (let symptom of symptoms) {
      symptom_ids.concat(symptom.id);
    }
    const query = {
      symptom_ids,
    };

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}/diseases?${querystring.stringify(
        query
      )}`
    );
    this.setState({
      diseasesData: result.data,
    });
  };

  componentDidMount() {
    this.getDiseasesData();
    console.log(this.state.diseasesData);
  }

  render() {
    const { diseasesData } = this.state;
    const diseaseList = diseasesData.map((disease, index) => {
      return <ListupInfo name={disease.name} sym={disease.sym} key={index} />;
    });
    return (
      <div className="contentalign">
        <h1>의심 증상</h1>
        <div className="listup">
          {this.state.listupData.map((listDes, i) => {
            return <ListupInfo name={listDes.name} sym={listDes.sym} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

class ListupInfo extends Component {
  render() {
    return (
      <table className="listTable">
        <tr>
          <td rowSpan="3">
            <img
              className="disimage"
              src={disimage}
              aria-hidden
              alt="disimage"
            ></img>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="./Detail">{this.props.name}</Link>
          </td>
        </tr>
        <tr>
          <td>{this.props.sym}</td>
        </tr>
      </table>
    );
  }
}

export default ListUp;
