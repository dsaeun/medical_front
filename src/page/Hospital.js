import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import HosInformation from '../component/HosInformation'
import dotenv from 'dotenv'
import { Marker, NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps'
import subjectList from '../utils/subjectList'
import _ from 'lodash'

dotenv.config()

class Hospital extends Component {
  state = {
    subjectList: subjectList,
    subject: '',
    hospitals: [],
    latitude: 37.576813,
    longitude: 126.976773,
    isLoading: false,
    information_visible: false,
    hospital_infos: {},
    changeAddress: '',
  }

  /**
   * 주소를 입력하고 경도, 위도가 변경되면 실행됩니다
   * 계산된 위경도를 기반으로 병원 정보를 요청합니다
   */
  componentDidUpdate = async () => {
    const { latitude, longitude, isLoading, subject } = this.state

    const default_subject = subject === 'total' ? '' : subject
    if (isLoading || subject) {
      this.setState({
        isLoading: false,
        subject: '',
      })
      try {
        const { data: item } = await axios.post(
          `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/hospitals`,
          {
            default_subject,
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
              hospitals: nextArray,
            })
          } else {
            // 배열로 전달되었을 때
            this.setState({
              hospitals: item,
            })
          }
        } else {
          this.setState({
            hospitals: [],
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const {
      hospitals,
      information_visible,
      latitude,
      longitude,
      subjectList,
      hospital_infos,
    } = this.state

    // 병원 정보 렌더링
    const information = (hospital) => {
      this.setState({
        information_visible: true,
        hospital_infos: hospital,
      })
    }

    // 주소 변환 요청
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
    }

    return (
      <div className="contentalignHos">
        <h1>근처병원 찾기</h1>
        <div className="hospitalList">
          <ul className="checklist">
            {subjectList.map((subject, i) => {
              return (
                <li className="checkli" key={i}>
                  <input
                    type="radio"
                    name="hos"
                    value={subject.code}
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
                  {subject.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="hospitalMap">
          <RenderAfterNavermapsLoaded
            // ncpClientId={process.env.REACT_APP_CLIENT_ID}
            ncpClientId="rt6tsuiaj3"
            // Naver Cloud Platform 유저의 경우 props.clientId 대신 props.ncpClientId를 사용합니다.
            // ncpClientId={YOUR_NCP_CLIENT_ID}
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
          >
            <NaverMap
              mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
              style={{
                width: '100%',
                height: '420px',
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
                  onClick={() => information(hospital)}
                  title={hospital.yadmNm}
                />
              ))}
              {/*<Marker*/}
              {/*    position={{ lat: 37.3595704, lng: 127.105399 }}*/}
              {/*/>*/}
            </NaverMap>
          </RenderAfterNavermapsLoaded>
          {/*현재 주소를 직접 입력합니다*/}

          {/*new input form */}
          <div className="container-sym hos">
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
          {information_visible ? (
          <HosInformation hospital_infos={hospital_infos} />
        ) : null}
        </div>
        
      </div>
    )
  }
}

export default Hospital
