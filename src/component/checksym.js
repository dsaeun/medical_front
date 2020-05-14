import React, {Component} from 'react';

class Checksym extends Component{
    constructor(props) {
        super(props);
        this.state = {
            symData: [
                {sym : "머리가 아픔"},
                {sym : "배가 아픔"}
            ]
        };
      }
      
    render(){
        return(
            <div className="symstyle">
                <ul className="checklist">
                {this.state.symData.map((symDes, i) => {
                return (<SymInfo sym={symDes.sym}
                  key={i}/>);
                  })}
                </ul>
            </div>
        );
    }
}

  class SymInfo extends Component{
    render(){
      return(
        <li className="checkli">
          <input type="radio" name="sym" value={this.props.sym}/>{this.props.sym}
        </li>
      );
    }
  }
  
export default Checksym;