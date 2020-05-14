import React, {Component} from 'react';
import '../App.css';
import HosList from '../component/HosList';

class Hospital extends Component{
    render(){
        return(
            <div className="contentalign">
                <h1>근처병원 찾기</h1>
                <HosList></HosList>
                <div className="hospitalMap">병원지도가 들어갈 부분</div>
            </div>
        );
    }
}

export default Hospital;