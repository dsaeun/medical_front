import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import dotenv from "dotenv";
import { PartConsumer } from "../container/CheckBoxContainer";

dotenv.config();

class CheckPart extends Component {
  state = {
    partData: [],
  };

  getPartData = async () => {
    const result = await axios.get('http://localhost:8000/parts');
    this.setState({
      partData: result.data,
    });
  };

  componentDidMount() {
    this.getPartData();
  }

  render() {
    const { partData } = this.state;
    const partList = partData.map((part, index) => (
      <PartInfo name={part.name} key={index} partId={part.id}/>
    ));

    return (
      <div className="partstyle">
        <ul className="checklist">{partList}</ul>
      </div>
    );
  }
}

class PartInfo extends Component {
  render() {
    return (
      <PartConsumer>
        {(value) => (
          <li className="checkli">
            <input
              type="radio"
              name="part"
              value={this.props.partId}
              onChange={(event) => {
                value.setPart(event.target.value);
              }}
            /><label>
            {this.props.name}
            </label>
          </li>
        )}
      </PartConsumer>
    );
  }
}

export default CheckPart;
