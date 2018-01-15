class Stopwatch extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    running: false,
    miliseconds: 0,
    seconds: 0,
    minutes: 0
  }
  this.start = this.start.bind(this);
  this.stop = this.stop.bind(this);
  this.calculate = this.calculate.bind(this);
  this.format = this.format.bind(this);
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

render() {
  const btnName = ['start', 'stop', 'reset', 'add result', 'remove results'];
  
  return (
    <div>
      <div>
        <Button value={btnName[0]} eventList={this.start} />
        <Button value={btnName[1]} eventList={this.stop} />
      </div>
      <div>
        <div className='watch'>{this.format()}</div>
        <Button value={btnName[3]} eventList={this.click} />
      </div>
      <div>
        <Button value={btnName[2]} eventList={this.click2} />
        <Button value={btnName[4]} eventList={this.click} />
      </div>
    </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.eventList}>{this.props.value}</button>
    );
  }
}

const App = document.getElementById('root');
ReactDOM.render(<Stopwatch />, App);











/*
class Stopwatch {
  constructor(display) {
      this.running = false;
      this.display = display;
      this.reset();
      this.print(this.times);
  }
  
  reset() {
    this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
  }  

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
      result = '0' + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');

const addResultButton = document.getElementById('result');
addResultButton.addEventListener('click', () => console.log('hey'));
*/