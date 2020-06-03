import React, { Component } from "react";
import "../App.css";
// import disimage from "../image/disimage.png";
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
      symptom_ids.push(symptom.id);
    }
    const query = {
      symptom_ids,
    };
    const queryString = querystring.stringify(query);

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/diseases?${queryString}`
    );
    this.setState({
      diseasesData: result.data,
    });
  };

  componentDidMount() {
    this.getDiseasesData();
  }

  render() {
    const { diseasesData } = this.state;
    const diseaseList = diseasesData.map((disease, index) => {
      return <ListUpInfo disease={disease} key={index} />;
    });
    return (
      <div className="contentalign">
        <h1>의심 증상</h1>
        <div className="listup">
          {diseaseList}
        </div>
      </div>
    );
  }
}

class ListUpInfo extends Component {
  render() {
    const { name, id, symptoms } = this.props.disease;
    return (
      <table className="listTable">
        <tr>
          <td>
            <Link to={{
              pathname: "/detail",
              state: {
                id,
              }
            }} className="disName">{name}</Link>
          </td>
        </tr>
        <tr>
          <td>대표증상 : {symptoms[0].name}</td>
        </tr>
      </table>
    );
  }
}

export default ListUp;
