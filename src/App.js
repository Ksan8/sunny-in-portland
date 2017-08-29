import React, { Component } from 'react';
import $ from 'jquery';
import ToggleDisplay from 'react-toggle-display';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      nextDays: [],
      show: false
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    const API_KEY = '053e6d728d7629123c0e73d87e6d7d68';
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/';
    const URL_END = '?id=5746545&units=imperial&APPID=';
    const CURRENT = 'weather';
    const DAILY = 'forecast/daily';
    let urlCurrent = BASE_URL + CURRENT + URL_END + API_KEY;
    let urlFive = BASE_URL + DAILY + URL_END + API_KEY;

    // AJAX request to OpenWeatherMap current weather API
    let requestCurrent = $.get(urlCurrent);

    requestCurrent.done(result => {
      let icon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png';

      // Create div for current info
      const weatherCurrent = {
        temp: result.main.temp,
        weather: result.weather[0].description,
        icon: icon
      };

      // Store in state
      this.setState({
        current: weatherCurrent,
        show: !this.state.show
      });
    });

    // AJAX request to OpenWeatherMap 16-day forecast API
    let requestFiveDay = $.get(urlFive);

    requestFiveDay.done(result => {
      const fiveDay = result.list.slice(0,5);

      // Create individual divs for each day
      const weatherFiveDay = fiveDay.map(function(day, index){
        // Convert date from Unix; display only day of week, month, and date
        let date = new Date(day.dt * 1000).toString().split(' ');
        let displayDate = date[0] + ' ' + date[1] + ' ' + date[2];

        let key = index; // React requires a unique key for any mapped items
        let max = day.temp.max;
        let min = day.temp.min;
        let weather = day.weather[0].description;
        let icon = 'http://openweathermap.org/img/w/' + day.weather[0].icon + '.png';

        return <section key={key}>
          <img key={key} src={icon} alt={weather}></img>
          <div className='temp-box'>
            <h4 key={key + 'date'} className='date'>{displayDate}</h4>
            <h4 key={key + 'max'}>Max: {max}°F</h4>
            <h4 key={key + 'min'}>Min: {min}°F</h4>
            <p key={key + 'weather'}>{weather}</p>
          </div>
        </section>
        ;
      });
      // Store only data to be used in state
      this.setState({
        nextDays: weatherFiveDay,
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
            <section>
              <img src={this.state.current.icon} alt={this.state.current.weather}></img>
              <div className='temp-box'>
                <h1 className='temp'>{this.state.current.temp}°F</h1>
                <p>{this.state.current.weather}</p>
              </div>
            </section>
          </div>
          <div className='weather-small'>
            {this.state.nextDays}
          </div>
        </ToggleDisplay>
      </div>
    );
  }
}
