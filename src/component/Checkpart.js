import React, {Component} from 'react';
import '../App.css';

class Checkpart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        partData: [
            {part : "머리"},
            {part : "배"}
        ]
    };
  }

  render(){
    return (
        <div className="partstyle">
          <ul className="checklist">
            {this.state.partData.map((partDes, i) => {
              return (<PartInfo part={partDes.part}
                key={i}/>);
                })}
          </ul>
        </div>
    );
  }
}

class PartInfo extends Component{
  render(){
    return(
      <li className="checkli">
        <input type="radio" name="part" value={this.props.part}/>{this.props.part}
      </li>
    );
  }
}

export default Checkpart;
