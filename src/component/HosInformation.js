import React, { Component } from 'react'

class HosInformation extends Component {
    render() {
        return (
            <div className="hosinfo">
                {this.props.yadmNm}
            </div>
        )
    }
}

export default HosInformation;