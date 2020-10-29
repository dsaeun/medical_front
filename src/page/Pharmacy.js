import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import dotenv from 'dotenv'
import { Marker, NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps'
import PharmacyInformation from '../component/PharmacyInformation'
import _ from 'lodash'

dotenv.config()

class Pharmacy extends Component {
  state = {
    subject: '',
    pharmacies: [],
    latitude: 37.576813,
    longitude: 126.976773,
    isLoading: false,
    information_loading: false,
    information_visible: false,
    pharmacy_infos: {},
    changeAddress: '',
  }

  /**
   * 주소를 입력하고 경도, 위도가 변경되면 실행됩니다
   * 계산된 위경도를 기반으로 약국 정보를 요청합니다
   */
  componentDidUpdate = async () => {
    const { latitude, longitude, isLoading } = this.state

    if (isLoading) {
      this.setState({
        isLoading: false,
      })
      try {
        const { data: item } = await axios.post(
          `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/pharmacies`,
          {
            longitude,
            latitude,
          }
        )

        if (item) {
          // 객체가 전달되었을 때, 배열로 바꿔줌
          if (!_.isArray(item)) {
            let nextArray = []
            nextArray = nextArray.concat(item)
            this.setState({
              pharmacies: nextArray,
            })
          } else {
            // 배열로 전달되었을 때
            this.setState({
              pharmacies: item,
            })
          }
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

    // 약국 상세정보를 다시 로딩되지 않도록 블록 설정합니다.
    const setLoading = () => {
      this.setState({
        information_loading: false,
      })
    }

    const sendAddress = async () => {
        const { changeAddress } = this.state
        const url =
            `https://dapi.kakao.com/v2/local/search/address.json?` +
            `query=${changeAddress}`
        const {
            data: { documents },
        } = await axios.get(url, {
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_ID}`,
            },
        })
        // 결과값이 비어있는지 확인합니다
        if (!_.isEmpty(documents)) {
            this.setState({
                latitude: documents[0].y,
                longitude: documents[0].x,
                isLoading: true,
            })
        } else {
            alert('잘못된 주소입니다')
        }
    };

    return (
      <div className="contentalign">
        <h1>근처약국 찾기</h1>
        <div className="pharmacyMap">
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
                height: '80%',
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

          {/*new input form */}
          <div className="container-sym" id="phar">
            <input
              type="search"
              id="search"
              placeholder="Find with address"
              onChange={(event) => {
                this.setState({
                  changeAddress: event.target.value,
                })
              }}
              onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                      sendAddress();
                  }
              }}
            />
          </div>

          {/*현재 주소를 직접 입력합니다*/}
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
