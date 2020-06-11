import React from "react";
import ReactDOM from "react-dom";

export default class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date(), startTime: new Date().getTime()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    // const startTime = new Date().getTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {

    const getDisp = () => {
  const t = Math.floor((this.state.date - this.state.startTime)/1000)
  const ss = t % 60
  const m = Math.floor(t/60)
  const mm = m % 60
  const hh = Math.floor(mm / 60)
  const z = (num) => {
    const s = '00' + String(num)
    return s.substr(s.length - 2, 2)
  }
  return <span>{z(mm)}:{z(ss)}</span>
}


    return (
      
        <div> {getDisp()} </div>
      
    );
  }
}
