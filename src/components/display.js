import React from 'react';

class Display extends React.Component {
  state = {
    time: {
      seconds: 30,
      minutes: 5,
      hours: 1,
    },
    dispalyTime: '',
  }

  setTimer = (time) => {
    this.setState({ time });
  }

  startTimer = () => {
    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(this.timerCountdown, 1000);
  }

  timerCountdown = () => {
    console.error('test');
    let { seconds } = this.state.time;
    let { minutes } = this.state.time;
    let { hours } = this.state.time;
    if (!seconds && !minutes && !hours) {
      clearInterval(this.countdownInterval);
      return;
    }

    if (seconds === 0) {
      seconds = 59;
      if (minutes === 0) {
        minutes = 59;
        if (hours !== 0) {
          hours -= 1;
        }
      } else {
        minutes -= 1;
      }
    } else {
      seconds -= 1;
    }

    const time = { seconds, minutes, hours };
    this.setState({ time });
    this.formatTime();
  }

  formatTime = () => {
    const { time } = this.state;
    let secondsString;
    let minutesString;
    let hoursString;

    if (time.seconds < 10) {
      secondsString = `0${time.seconds}`;
    } else {
      secondsString = time.seconds.toString();
    }

    if (time.minutes < 10) {
      minutesString = `0${time.minutes}`;
    } else {
      minutesString = time.minutes.toString();
    }

    if (time.hours < 10) {
      hoursString = `0${time.hours}`;
    } else {
      hoursString = time.hours.toString();
    }

    this.setState({ dispalyTime: `${hoursString}:${minutesString}:${secondsString}` });
  }

  componentDidMount() {
    this.countdownInterval = null;
    this.formatTime();
    this.startTimer();
  }

  render() {
    const { dispalyTime } = this.state;
    return (
      <div className="Display">
        <div>{dispalyTime}</div>
      </div>
    );
  }
}

export default Display;
