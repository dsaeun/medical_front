import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import dotenv from 'dotenv'
import { Marker, NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps'
import PharmacyInformation from '../component/PharmacyInformation'

dotenv.config()

class Pharmacy extends Component {
    state = {
        subject: '',
        pharmacies: [],
        latitude: 37.576813,
        longitude: 126.976773,
        isLoading: true,
        information_loading: false,
        information_visible: false,
        pharmacy_infos: {},
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
            this.setState({
                isLoading: false,
                subject: '',
            })
            // const default_subject = subject === '전체' ? '' : subject
            // const url =
            //     `/B551182/pharmacyInfoService/getParmacyBasisList?ServiceKey=${process.env.REACT_APP_PUBLIC_DATA_CLIENT_ID}&` +
            //     `numOfRows=50&xPos=${longitude}&yPos=${latitude}&radius=1000`
            const url =
                `B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?serviceKey=${process.env.REACT_APP_PUBLIC_DATA_CLIENT_ID}&` +
                `WGS84_LON=${longitude}&WGS84_LAT=${latitude}&numOfRows=10&pageNo=1`
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
                        pharmacies: item,
                    })
                } else {
                    this.setState({
                        pharmacies: [],
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        const {
            pharmacies,
            information_visible,
            latitude,
            longitude,
            pharmacy_infos,
            information_loading,
        } = this.state

        // 약국 정보 렌더링
        const information = (pharmacy) => {
            this.setState({
                information_visible: true,
                pharmacy_infos: pharmacy,
                information_loading: true,
            })
        }

        const setLoading = () => {
            this.setState({
                information_loading: false,
            })
        }

        return (
            <div className="contentalign">
                <h1>근처약국 찾기</h1>
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
                            {pharmacies.map((pharmacy, index) => (
                                <Marker
                                    position={{
                                        lat: pharmacy.latitude,
                                        lng: pharmacy.longitude,
                                    }}
                                    key={index}
                                    onClick={() => information(pharmacy)}
                                    title={pharmacy.dutyName}
                                />
                            ))}
                            {/*<Marker*/}
                            {/*    position={{ lat: 37.3595704, lng: 127.105399 }}*/}
                            {/*/>*/}
                        </NaverMap>
                    </RenderAfterNavermapsLoaded>
                    <button onClick={() => {}}>A</button>
                    <button onClick={() => {}}>B</button>
                    <button onClick={() => {}}>C</button>
                </div>
                {information_visible ? (
                    <PharmacyInformation
                        pharmacy_infos={pharmacy_infos}
                        information_loading={information_loading}
                        setLoading={setLoading}
                    />
                ) : null}
            </div>
        )
    }
}

export default Pharmacy
