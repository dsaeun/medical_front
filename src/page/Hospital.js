import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import HosInformation from '../component/HosInformation'
import dotenv from 'dotenv'
import { Marker, NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps'

dotenv.config()

class Hospital extends Component {
    state = {
        hosData: [{ hos: '전체' }, { hos: '12' }, { hos: '01' }],
        subject: '',
        hospitals: [],
        latitude: 37.576813,
        longitude: 126.976773,
        isLoading: true,
        information_visible: false,
        yadmNm: '',
    }

    // 현재 위치의 위도와 경도를 설정해줍니다
    handleGeoSuccess = (location) => {
        this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
    }

    /**
     * index.html에서 설정한 naver maps를 navermaps에 넣어줌
     * geolocation을 이용해서 현재 위치의 위도와 경도를 받아옴
     * reverseGeocode를 이용해서 위도, 경도를 주소로 바꿔준다.
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.handleGeoSuccess)
    }

    /**
     * handleGeoSuccess가 호출되고 상태가 업데이트되면 실행
     * @returns {Promise<void>}
     */
    componentDidUpdate = async () => {
        const { latitude, longitude, isLoading, subject } = this.state

        if (isLoading || subject) {
            console.log(subject)
            const default_subject = subject === '전체' ? '' : subject;
            const url =
                `/B551182/hospInfoService/getHospBasisList?serviceKey=${process.env.REACT_APP_PUBLIC_DATA_CLIENT_ID}&` +
                `numOfRows=50&dgsbjtCd=${default_subject}&xPos=${longitude}&yPos=${latitude}&radius=1000`
            try {
                const {
                    data: {
                        response: {
                            body: {
                                items: { item },
                            },
                        },
                    },
                } = await axios.get(url)

                console.log(item)

                if (item) {
                    this.setState({
                        hospitals: item,
                    })
                } else {
                    this.setState({
                        hospitals: item,
                    })
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.setState({
                    isLoading: false,
                    subject: '',
                })
            }
        }
    }

    render() {
        const { hospitals, information_visible, latitude, longitude,
            yadmNm } = this.state

        // 병원 정보 렌더링
        const information = (yadmNm) => {
            this.setState({
                information_visible: true,
                yadmNm: yadmNm,
            })
        }

        return (
            <div className="contentalign">
                <h1>근처병원 찾기</h1>
                <div className="hospitalList">
                    <ul className="checklist">
                        {this.state.hosData.map((hosDes, i) => {
                            return (
                                <li className="checkli" key={i}>
                                    <input
                                        type="radio"
                                        name="hos"
                                        value={hosDes.hos}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                this.setState({
                                                    subject: event.target.value,
                                                })
                                            } else {
                                                this.setState({
                                                    subject: '',
                                                })
                                            }
                                        }}
                                    />
                                    {hosDes.hos}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="hospitalMap">
                    <RenderAfterNavermapsLoaded
                        ncpClientId={process.env.REACT_APP_CLIENT_ID}
                        // Naver Cloud Platform 유저의 경우 props.clientId 대신 props.ncpClientId를 사용합니다.
                        // ncpClientId={YOUR_NCP_CLIENT_ID}
                        error={<p>Maps Load Error</p>}
                        loading={<p>Maps Loading...</p>}
                    >
                        <NaverMap
                            mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
                            style={{
                                width: '100%',
                                height: '400px',
                            }}
                            defaultCenter={{ lat: latitude, lng: longitude }}
                            center={{ lat: latitude, lng: longitude }}
                            defaultZoom={15}
                            naverRef={(ref) => {
                                this.mapRef = ref
                            }}
                            zoomControl={true}
                        >
                            {hospitals.map((hospital, index) => (
                                <Marker
                                    position={{
                                        lat: hospital.YPos,
                                        lng: hospital.XPos,
                                    }}
                                    key={index}
                                    onClick={() => information(hospital.yadmNm)}
                                    title={hospital.yadmNm}
                                />
                            ))}
                            {/*<Marker*/}
                            {/*    position={{ lat: 37.3595704, lng: 127.105399 }}*/}
                            {/*/>*/}
                        </NaverMap>
                    </RenderAfterNavermapsLoaded>
                    <button onClick={() => {

                    }}>
                        현재 위치
                    </button>
                </div>
                {information_visible ? (
                    <HosInformation yadmNm={yadmNm} />
                ) : null}
            </div>
        )
    }
}

export default Hospital
