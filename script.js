class Stopwatch extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    running: false,
    miliseconds: 0,
    seconds: 0,
    minutes: 0,
    results: []
  }
  this.start = this.start.bind(this);
  this.stop = this.stop.bind(this);
  this.calculate = this.calculate.bind(this);
  this.format = this.format.bind(this);
  this.reset = this.reset.bind(this);
  this.addResult = this.addResult.bind(this);
  this.removeResults = this.removeResults.bind(this);
}

start() {
  if (!this.state.running) {
    this.setState({running: true});
    this.watch = setInterval(() => {
      this.setState({miliseconds: this.state.miliseconds +1 })
      this.calculate(); 
    }, 10);
  
  }
}

stop() {
  clearInterval(this.watch);
  this.setState({running: false});
}

calculate() {
  if (this.state.miliseconds >= 100) {
    this.setState({
      miliseconds: 0,
      seconds: this.state.seconds +1
    });
  }
  if (this.state.seconds >= 60) {
    this.setState({
      seconds: 0,
      minutes: this.state.minutes +1
    });
  }
}

format() {
  let time ='';
  (this.state.minutes.toString().length < 2)? time += `0${this.state.minutes}:` : time +=`${this.state.minutes}`;
  (this.state.seconds.toString().length < 2)? time += `0${this.state.seconds}:`: time += `${this.state.seconds}:`;
  (this.state.miliseconds.toString().length < 2)? time += `0${this.state.miliseconds}` : time += this.state.miliseconds;
  
  return time;
 }

reset() {
  this.setState({
    miliseconds: 0,
    seconds: 0,
    minutes: 0
  });
}

addResult() {
  this.state.results.push(this.format());
  console.log(this.state.results);
  this.render();
}

removeResults() {
  this.setState({
    results: []
  });
}

render() {
  const btnName = ['start', 'stop', 'reset', 'add result', 'remove results'];
  
  return (
    <div className="container">
      <div className="top-control">
        <Button value={btnName[0]} eventList={this.start} />
        <Button value={btnName[1]} eventList={this.stop} />
      </div>
      <div className="stopwatch">
        <div className='watch'>{this.format()}</div>
        <Button value={btnName[3]} eventList={this.addResult} />
      </div>
      <div className="bottom-control">
        <Button value={btnName[2]} eventList={this.reset} />
        <Button value={btnName[4]} eventList={this.removeResults} />
      </div>
        <List  arr={this.state.results} />
    </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className="btn" onClick={this.props.eventList}>{this.props.value}</button>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <ol className="list">
       {this.props.arr.map(result => <li>{result}</li>)}
      </ol>
    );
  }
}

const App = document.getElementById('root');
ReactDOM.render(<Stopwatch />, App);