import React, { Component } from 'react'

class HosInformation extends Component {
    render() {
        const { yadmNm, addr, telno, hospUrl } = this.props.hospital_infos;
        return (
            <div className="hosinfo">
                <p>병원명: {yadmNm}</p>
                <p>주소: {addr}</p>
                <p>전화번호: {telno}</p>
                <p>홈페이지: {hospUrl}</p>
            </div>
        )
    }
}

export default HosInformation;