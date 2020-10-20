import React, { Component } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import moment from 'moment'

dotenv.config()

class PharmacyInformation extends Component {
    state = {
        pharmacy_detail: {},
    }

    // 약국의 상세정보(개폐시간 등)를 요청합니다.
    getPharmacyDetail = async (hpid, setLoading) => {
        setLoading();
        const url =
            `/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire?serviceKey=${process.env.REACT_APP_PUBLIC_DATA_CLIENT_ID}&` +
            `HPID=${hpid}`
        const {
            data: {
                response: {
                    body: {
                        items: {
                            item
                        }
                    }
                }
            }
        } = await axios.get(url)
        this.setState({
            pharmacy_detail: item,
        })
    }

    componentDidMount = async () => {
        const { hpid } = this.props.pharmacy_infos
        const { setLoading } = this.props;

        this.getPharmacyDetail(hpid, setLoading);
    }


    componentDidUpdate = async () => {
        const { hpid } = this.props.pharmacy_infos
        const { information_loading, setLoading } = this.props;

        if (information_loading) {
            this.getPharmacyDetail(hpid, setLoading);
        }
    }

    render() {
        const { dutyName, dutyAddr, dutyTel1 } = this.props.pharmacy_infos;
        const { pharmacy_detail } = this.state;

        return (
            <div className="hosinfo">
                <p>약국명: {dutyName}</p>
                <p>주소: {dutyAddr}</p>
                <p>전화번호: {dutyTel1}</p>
                <table
                    style={{
                        border: '1px solid #444444',
                        borderCollapse: 'collapse',
                    }}
                >
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid' }}>월요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime1s ? moment(pharmacy_detail.dutyTime1s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime1c ? moment(pharmacy_detail.dutyTime1c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>화요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime2s ? moment(pharmacy_detail.dutyTime2s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime2c ? moment(pharmacy_detail.dutyTime2c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>수요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime3s ? moment(pharmacy_detail.dutyTime3s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime3c ? moment(pharmacy_detail.dutyTime3c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>목요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime4s ? moment(pharmacy_detail.dutyTime4s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime4c ? moment(pharmacy_detail.dutyTime4c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>금요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime5s ? moment(pharmacy_detail.dutyTime5s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime5c ? moment(pharmacy_detail.dutyTime5c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>토요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime6s ? moment(pharmacy_detail.dutyTime6s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime6c ? moment(pharmacy_detail.dutyTime6c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>일요일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime7s ? moment(pharmacy_detail.dutyTime7s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime7c ? moment(pharmacy_detail.dutyTime7c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid' }}>공휴일</td>
                            <td style={{ border: '1px solid' }}>
                                {pharmacy_detail.dutyTime8s ? moment(pharmacy_detail.dutyTime8s, "hmm").format("HH:mm") : ''}
                                ~
                                {pharmacy_detail.dutyTime8c ? moment(pharmacy_detail.dutyTime8c, "hmm").format("HH:mm") : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PharmacyInformation
