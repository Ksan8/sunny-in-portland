import React, { Component } from 'react';
import $ from 'jquery';
// import axios from 'axios';
import './App.css';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
  }

  // getData() {
  //   const API_KEY = '053e6d728d7629123c0e73d87e6d7d68';
  //   const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?id=5746545&units=imperial&mode=json&APPID=';
  //   let url = BASE_URL + API_KEY;
  //   // let self = this;
  //   // return axios.get(url)
  //   //   .then(function (response) {
  //   //     // console.log(response);
  //   //     self.setState({ data: response });
  //   //     console.log(self.state.data);
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  //
  //   let request = $.get(url);
  //
  //   request.done(result => {
  //     this.setState({ data: result });
  //     // console.log(result);
  //     console.log(this.state.data.city.name);
  //   });
  // }
  
  getData() {
    const API_KEY = '053e6d728d7629123c0e73d87e6d7d68';
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?id=5746545&units=imperial&mode=json&APPID=';
    let url = BASE_URL + API_KEY;

    let request = $.get(url);

    request.done(result => {
      this.setState({ data: result });
      // console.log(result);
      console.log(this.state.data.city.name);
    });
  }


}