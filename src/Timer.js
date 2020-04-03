import React, { Component, useRef, useState } from 'react'
import secondsTohhmmss from './secondsTohhmmss'
import PropTypes from 'prop-types'

let offset = null, interval = null


const Task = () => {
  const inputStyle = {
    margin: "0px",
    padding: "1em"
  };
  const formRef = useRef(null);
  const [state, setState] = useState({});
  return <form ref={formRef}>
    <input
      style={inputStyle}
      type="text"
      name="name"
      placeholder="¿Qué actividad haces?"
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input>
  </form>
}


export default class Timer extends Component {
  static get propTypes() {
    return {
      options: PropTypes.object
    }
  }

  constructor(props) {
    super(props)
    this.state = { clock: 0, time: '' }
  }

  componentDidMount() {
    this.new()
  }

  componentWillUnmount() {
    this.pause()
  }

  pause() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update.bind(this), this.props.options.delay)
    }
  }

  new() {
    let clockReset = 0
    this.setState({ clock: clockReset })
    let time = secondsTohhmmss(clockReset / 1000)
    this.setState({ time: time })
  }

  update() {
    let clock = this.state.clock
    clock += this.calculateOffset()
    this.setState({ clock: clock })
    let time = secondsTohhmmss(clock / 1000)
    this.setState({ time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {

    const buttonStyle = {
      marginRight: "5px",
      padding: "10px",
    };

    const secondsStyles = {
      fontSize: "200%",
      fontWeight: "200",
      lineHeight: "1.5",
      margin: "0"
    };

    return (
      <div>
        <Task />
        <h3 style={secondsStyles} >
          {this.state.time} {this.props.prefix}
        </h3>
        <br />
        <button onClick={this.new.bind(this)} style={buttonStyle} >Nueva</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >Iniciar</button>
        <button onClick={this.pause.bind(this)} style={buttonStyle} >Pausar</button>
      </div>
    )
  }
}
