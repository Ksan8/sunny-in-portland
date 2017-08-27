import React, { Component } from 'react';
import $ from 'jquery';
import ToggleDisplay from 'react-toggle-display';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    const API_KEY = '053e6d728d7629123c0e73d87e6d7d68';
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?id=5746545&units=imperial&mode=json&APPID=';
    let url = BASE_URL + API_KEY;

    let request = $.get(url);

    request.done(result => {
      const nextFive = [
        result.list[0],
        result.list[7],
        result.list[15],
        result.list[23],
        result.list[31],
      ];
      // console.log(nextFive);

      const weatherList = nextFive.map(function(day, index){
        let date = new Date(day.dt * 1000).toString().split(' ');
        let displayDate = date[0] + ' ' + date[1] + ' ' + date[2];
        console.log(date[0]);

        let key = index;
        let temp = day.main.temp;
        let max = day.main.temp_max;
        let min = day.main.temp_min;
        let weather = day.weather[0].description;
        let icon = 'http://openweathermap.org/img/w/' + day.weather[0].icon + '.png';

        return <div key={key} className='weather-box'>
          <img key={key} src={icon} alt={weather}></img>
          <div className='temp-box'>
            <h4 key={key + 'date'}>{displayDate}</h4>
            <h1 key={key + 'temp'}>{temp}°F</h1>
            <h4 key={key + 'max'}>Max: {max}°F</h4>
            <h4 key={key + 'min'}>Min: {min}°F</h4>
            <p key={key + 'we'}>{weather}</p>
          </div>
        </div>
        ;
      });

      this.setState({
        data: weatherList,
        show: !this.state.show
      });
    });
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Sunny In Portland?</h2>
          <h4 className="App-intro">Know if you should be happy or not.</h4>
        </div>

        <ToggleDisplay show={!this.state.show}>
          <button onClick={() => this.getData()}>5-day Forecast</button>
        </ToggleDisplay>

        <ToggleDisplay show={this.state.show} className='weather-main'>
          <div className='weather-large'>
            {this.state.data[0]}
          </div>
          <div className='weather-small'>
            {this.state.data.slice(1,5)}
          </div>
        </ToggleDisplay>
      </div>
    );
  }
}
