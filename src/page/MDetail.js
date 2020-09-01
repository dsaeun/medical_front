import React, { Component } from "react";
import "../App.css";
import disimage from "../image/disimage.png";
import axios from "axios";

class Detail extends Component {
  state = {
    medicineData: [
      { Mname: "복통", dis: "쓰이는 병명", eat: "복용법", effect: "효과" },
    ],
    drugData: {},
  };

  getDrugData = async () => {
    const { id } = this.props.location.state;

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/drugs/${id}`
    );

    this.setState({
      drugData: result.data,
    });
  };

  componentDidMount() {
    this.getDrugData();
  }

  render() {
    const { name, description, ingredients, side_effects } = this.state.drugData;
    return (
      <div className="contentalign">
        <div className="detailback">
          <MedicineInfo
            name={name}
            description={description}
            ingredients={ingredients}
            side_effects={side_effects}
          />
        </div>
      </div>
    );
  }
}

class MedicineInfo extends Component {
  render() {
    const { name, description, ingredients, side_effects } = this.props;
    return (
      <table>
        <tr>
          <td className="detailTable" rowSpan="3">
            <img
              className="detailimage"
              src={disimage}
              aria-hidden
              alt="disimage"
            ></img>
          </td>
        </tr>
        <tr>
          <td className="detailTable">{name}</td>
        </tr>
        <tr>
          <td className="detailTable">{description}</td>
        </tr>
        <tr>
          <td className="detailTable">{ingredients}</td>
        </tr>
        <tr>
          <td className="detailTable">{side_effects}</td>
        </tr>
      </table>
    );
  }
}

export default Detail;
