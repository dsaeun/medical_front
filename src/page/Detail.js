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
      `${process.env.REACT_APP_API_HOST}/diseases/${id}`
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
    const { name, cure, sym, img, hos } = this.props;
    const symptomList = sym.map((symptom, index) => (
      <td className="detailTable" key={index}>
        {symptom.name}
      </td>
    ));
    return (
      <table>
        <tr>
          <td className="detailTable" rowSpan="3">
            <img
              className="detailimage"
              src={img}
              aria-hidden
              alt="disimage"
            ></img>
          </td>
        </tr>
        <tr>
          <td className="detailTable">{name}</td>
        </tr>
        <tr>
          {symptomList}
          {/*<td className="detailTable">hi</td>*/}
        </tr>
        <tr>
          <td className="detailTable">{cure}</td>
        </tr>
        <tr>
          <td className="detailTable">{hos}</td>
        </tr>
      </table>
    );
  }
}

export default Detail;
