import {Component} from 'react'
import './index.css'

const initialState = {
  isTimer: false,
  timerLimitInMinutes: 25,
  timerInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimer = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimer = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimeLimitController = () => {
    const {timerLimitInMinutes, timerInSeconds} = this.state
    const buttonDisabled = timerInSeconds > 0

    return (
      <div className="main-container">
        <p className="sub-heading">Set Timer Limit</p>
        <div className="btn-timer-container">
          <button
            className="minus-btn"
            type="button"
            onClick={this.onDecreaseTimer}
            disabled={buttonDisabled}
          >
            -
          </button>
          <div className="mini-timer-container">
            <p className="timer-min">{timerLimitInMinutes}</p>
          </div>
          <button
            className="plus-btn"
            type="button"
            onClick={this.onIncreaseTimer}
            disabled={buttonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeInSeconds = () => {
    const {timerInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimer: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  renderTimerController = () => {
    const {isTimer} = this.state
    const iconImgUrl = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imgAltText = isTimer ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="play-icon"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img src={iconImgUrl} className="icon-img" alt={imgAltText} />
          <p className="img-text">{isTimer ? 'Pause' : 'Start'}</p>
        </button>
        <button className="reset-btn" type="button" onClick={this.resetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="reset-img"
            alt="reset icon"
          />
          <p className="reset-text">Reset</p>
        </button>
      </div>
    )
  }

  onStartOrPauseTimer = () => {
    const {isTimer, timerInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }
    if (isTimer) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimer: !prevState.isTimer}))
  }

  getTimerFormat = () => {
    const {timerInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingTime = timerLimitInMinutes * 60 - timerInSeconds
    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = Math.floor(totalRemainingTime % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimer} = this.state
    const labelText = isTimer ? 'Running' : 'Paused'
    return (
      <div className="background">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-display-container">
          <div className="timer-display">
            <h1 className="elapsed-time">{this.getTimerFormat()}</h1>
            <p className="label-text">{labelText}</p>
          </div>
        </div>
        <div className="controllers-container">
          {this.renderTimerController()}
          {this.renderTimeLimitController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
