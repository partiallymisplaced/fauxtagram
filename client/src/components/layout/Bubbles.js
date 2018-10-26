import React, { Component } from 'react'

class Bubbles extends Component {
  render() {
    return (
      <div className="background-bubbles" tabIndex="-1">
        <div className="bubble small bubble-1"></div>
        <div className="bubble small bubble-2"></div>
        <div className="bubble small bubble-3"></div>
        <div className="bubble medium bubble-4"></div>
        <div className="bubble large bubble-5"></div>
        <div className="bubble large bubble-6"></div>
      </div>
    )
  }
}

export default Bubbles;