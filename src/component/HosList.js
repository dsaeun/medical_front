import React, {Component} from 'react';
import '../App.css';

class Hoslist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hosData: [
                {hos : "안과"},
                {hos : "내과"}
            ]
        };
      }

    render(){
        return(
            <div className="hospitalList">
                <ul className="checklist">
            {this.state.hosData.map((hosDes, i) => {
              return (<HosInfo hos={hosDes.hos}
                key={i}/>);
                })}
          </ul>
            </div>
        );
    }
}

class HosInfo extends Component{
    render(){
      return(
        <li className="checkli">
          <input type="checkbox" name="hos" value={this.props.hos}/>{this.props.hos}
        </li>
      );
    }
  }  

export default Hoslist;