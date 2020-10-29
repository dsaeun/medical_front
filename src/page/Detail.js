import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'

class Detail extends Component {
  state = {
    disease: {
      name: '',
      description: '',
      cure: '',
      symptoms: [],
      subjects: [],
      parts: [],
    },
  }

  getDiseaseData = async () => {
    const { id } = this.props.location.state

    const result = await axios.get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_PORT}/diseases/${id}`
    )

    this.setState({
      disease: result.data,
    })
  }

  componentDidMount() {
    this.getDiseaseData()
  }

  render() {
    const { disease } = this.state
    return (
      <div className="contentalign">
        <div className="detailback">
          <DetailInfo
            name={disease.name}
            sym={disease.symptoms}
            description={disease.description}
            cure={disease.cure}
            subjects={disease.subjects}
            parts={disease.parts}
          />
        </div>
      </div>
    )
  }
}

class DetailInfo extends Component {
  static defaultProps = {
    sym: [],
    subjects: [],
    parts: [],
  }

  render() {
    const { name, cure, sym, subjects, description, parts } = this.props

    const symptomList = sym.map((symptom, index) => (
      <span key={index} className="hashTag">
        #{symptom.name}
      </span>
    ))
    const subjectList = subjects.map((subject, index) => (
      <span key={index}>{subject.name}</span>
    ))
    const partList = parts.map((part, index) => (
      <span key={index}>{part.name}</span>
    ))

    return (
      <table>
        <tbody>
          <tr>
            <td className="detailTitle">
              <h1>{name}</h1>
            </td>
          </tr>
          <tr>
            <td className="detailTD">
              <ul>
                <li className="semiTitle">설명</li>
              </ul>
              {description}
            </td>
          </tr>
          <tr>
            <td className="detailTD">
              <ul>
                <li className="semiTitle">증상</li>
              </ul>
              {symptomList}
            </td>
          </tr>
          <tr>
            <td className="detailTD">
              <ul>
                <li className="semiTitle">치료법</li>
              </ul>
              {cure}
            </td>
          </tr>
          <tr>
            <td className="detailTD">
              <ul>
                <li className="semiTitle">진료 과목</li>
              </ul>
              {subjectList}
            </td>
          </tr>
          <tr>
            <td className="detailTD">
              <ul>
                <li className="semiTitle">관련 부위</li>
              </ul>
              {partList}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Detail
