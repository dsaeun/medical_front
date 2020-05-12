import React, {Component} from 'react';
import '../App.css';

class checkpart extends Component{
    constructor(props){
        super(props)
        this.state={
            part:'head'
        }
    }

    render() {
        return (
            <div className="partstyle">
                <ul className="checklist">
                    <li className="checkli">
                        <label><input type="radio" name="part" value="part1"/>파트1</label>
                    </li>
                    
                    <li className="checkli">
                    <label><input type="radio" name="part" value="part2"/>파트2</label>
                    </li>
                </ul>
            </div>
        );
}
}
export default checkpart