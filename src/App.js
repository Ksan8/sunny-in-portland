import React, { Component } from 'react';
import $ from 'jquery';
// import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
  }

  getData() {
    let url = 'http://api.openweathermap.org/data/2.5/forecast?id=5746545&units=imperial&mode=json&APPID=053e6d728d7629123c0e73d87e6d7d68';
    // return axios.get(url)
    //   .then(function (response) {
    //     console.log(response);
    //
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    let request = $.get(url);

    request.done(result => {
      this.setState({ data: result });
      // console.log(result);
      console.log(this.state.data);
    });
  }

  componentDidMount() {
    this.getData();
    // console.log(this.state.data);
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Sunny In Portland?</h2>
        </div>
        <h4 className="App-intro">5-day Forecast</h4>
        {/* <img src = {"http://openweathermap.org/img/w/" + this.props.icon + ".png"} /> */}
        {/* <p>{this.state.data.city.name}</p> */}
      </div>
    );
  }
}

export default App;
