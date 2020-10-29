import React, { Component } from "react";
import "../App.css";
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
          <MedicineInfo
            name={name}
            description={description}
            ingredients={ingredients}
            side_effects={side_effects}
          />
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
          <td className="detailTitle"><h1>{name}</h1></td>
        </tr>
        <tr>
          <td className="detailTD" dangerouslySetInnerHTML={{__html: this.props.description}}/>
        </tr>
        <tr>
          <td className="detailTD">{ingredients}</td>
        </tr>
        <tr>
          <td className="detailTD">{side_effects}</td>
        </tr>
      </table>
    );
  }
}

export default Detail;
