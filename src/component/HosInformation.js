import React, { Component } from 'react'

class HosInformation extends Component {
    render() {
        const { yadmNm, addr, telno, hospUrl } = this.props.hospital_infos;
        return (
            <div className="hosinfo">
                <h2 id="hosName">{yadmNm}</h2>
                <p>{addr}</p>
                <p>전화번호 : {telno}</p>
                <p>홈페이지 : {hospUrl}</p>
            </div>
        )
    }
}

export default HosInformation;