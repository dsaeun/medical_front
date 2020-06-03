import React, { Component } from "react";
import "../App.css";
// import disimage from "../image/disimage.png";
import axios from "axios";

class Detail extends Component {
  state = {
    disease: {},
  };

  getDiseaseData = async () => {
    const { id } = this.props.location.state;

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/diseases/${id}`
    );

    this.setState({
      disease: result.data,
    });
  };

  componentDidMount() {
    this.getDiseaseData();
  }

  render() {
    const { disease } = this.state;
    return (
      <div className="contentalign">
        <div className="detailback">
          <DetailInfo
            name={disease.name}
            sym={disease.symptoms}
            cure={disease.cure}
            img={disease.images}
            hos={"병원"}
          />
        </div>
      </div>
    );
  }
}

class DetailInfo extends Component {
  static defaultProps = {
    sym: [],
  };

  render() {
    const { name, cure, sym, hos } = this.props;
    const symptomList = sym.map((symptom, index) => (
      <span key={index}>
        {symptom.name}
      </span>
    ));
    return (
      <table>
        <tr>
          <td><h3>{name}</h3></td>
        </tr>
        <tr>
          <td>
          증상 : {symptomList}</td>
        </tr>
        <tr>
          <td>치료법 : {cure}</td>
        </tr>
        <tr>
          <td>진료 병원 : {hos}</td>
        </tr>
      </table>
    );
  }
}

export default Detail;
