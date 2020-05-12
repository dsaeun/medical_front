import React, {Component} from 'react';

class checksym extends Component{
    render(){
        return(
            <div className="symstyle">
                <ul className="checklist">
                    <li className="checkli">
                    <label><input type="radio" name="sym" value="sym1"/>귀가 아픔</label>
                    </li>
                    
                    <li className="checkli">
                    <label><input type="radio" name="sym" value="sym2"/>관자놀이가 아픔</label>
                    </li>
                </ul>
            </div>
        );
    }
}

export default checksym;