'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      results: []
    };
    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.calculate = _this.calculate.bind(_this);
    _this.format = _this.format.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.addResult = _this.addResult.bind(_this);
    _this.removeResults = _this.removeResults.bind(_this);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({ running: true });
        this.watch = setInterval(function () {
          _this2.setState({ miliseconds: _this2.state.miliseconds + 1 });
          _this2.calculate();
        }, 10);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.watch);
      this.setState({ running: false });
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      if (this.state.miliseconds >= 100) {
        this.setState({
          miliseconds: 0,
          seconds: this.state.seconds + 1
        });
      }
      if (this.state.seconds >= 60) {
        this.setState({
          seconds: 0,
          minutes: this.state.minutes + 1
        });
      }
    }
  }, {
    key: 'format',
    value: function format() {
      var time = '';
      this.state.minutes.toString().length < 2 ? time += '0' + this.state.minutes + ':' : time += '' + this.state.minutes;
      this.state.seconds.toString().length < 2 ? time += '0' + this.state.seconds + ':' : time += this.state.seconds + ':';
      this.state.miliseconds.toString().length < 2 ? time += '0' + this.state.miliseconds : time += this.state.miliseconds;

      return time;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      });
    }
  }, {
    key: 'addResult',
    value: function addResult() {
      this.state.results.push(this.format());
      console.log(this.state.results);
      this.render();
    }
  }, {
    key: 'removeResults',
    value: function removeResults() {
      this.setState({
        results: []
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var btnName = ['start', 'stop', 'reset', 'add result', 'remove results'];

      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'top-control' },
          React.createElement(Button, { value: btnName[0], eventList: this.start }),
          React.createElement(Button, { value: btnName[1], eventList: this.stop })
        ),
        React.createElement(
          'div',
          { className: 'stopwatch' },
          React.createElement(
            'div',
            { className: 'watch' },
            this.format()
          ),
          React.createElement(Button, { value: btnName[3], eventList: this.addResult })
        ),
        React.createElement(
          'div',
          { className: 'bottom-control' },
          React.createElement(Button, { value: btnName[2], eventList: this.reset }),
          React.createElement(Button, { value: btnName[4], eventList: this.removeResults })
        ),
        React.createElement(List, { arr: this.state.results })
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

var Button = function (_React$Component2) {
  _inherits(Button, _React$Component2);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { className: 'btn', onClick: this.props.eventList },
        this.props.value
      );
    }
  }]);

  return Button;
}(React.Component);

var List = function (_React$Component3) {
  _inherits(List, _React$Component3);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'ol',
        { className: 'list' },
        this.props.arr.map(function (result) {
          return React.createElement(
            'li',
            null,
            result
          );
        })
      );
    }
  }]);

  return List;
}(React.Component);

var App = document.getElementById('root');
ReactDOM.render(React.createElement(Stopwatch, null), App);
