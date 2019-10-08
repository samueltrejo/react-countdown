import React from 'react';

class Display extends React.Component {
  state = {
    time: {
      seconds: 0,
      minutes: 0,
      hours: 0,
    },
    dispalyTime: '',
    timeReturning: '',
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

  formateRetrunDate = (date) => {
    const weekDay = this.days[date.getDay()];
    const day = date.getDate();
    const month = this.months[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    if (!hours) {
      hours = 12;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const formattedTime = `I'll be back on ${weekDay}, ${month} ${day}, at ${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  calculateReturnTime = () => {
    const { time } = this.state;
    const totalMinutes = (time.hours * 60) + time.minutes;
    const totalSeconds = (totalMinutes * 60) + time.seconds;
    const totalMiliseconds = totalSeconds * 1000;

    const currentTime = new Date();
    const timeNow = new Date().getTime();
    const arrivalDate = timeNow + totalMiliseconds;

    const timeReturning = new Date(arrivalDate);

    const formattedTime = this.formateRetrunDate(timeReturning);

    this.setState({ timeReturning: formattedTime });
  }

  componentDidMount() {
    this.countdownInterval = null;
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.formatTime();
    this.calculateReturnTime();
    this.startTimer();
  }

  render() {
    const { dispalyTime } = this.state;
    const { timeReturning } = this.state;
    return (
      <div className="Display">
        <div>{dispalyTime}</div>
        <div>{timeReturning}</div>
      </div>
    );
  }
}

export default Display;
