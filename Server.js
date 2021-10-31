'use strict';

import express from 'express';
const app = express();

class App {
  #currentUser;

  async _getData() {
    const requestURL = './data.json';
    const response = await fetch(requestURL);
    const data = await response.json();
  }
}
const port = 5500;
app.listen(port, '127.0.0.1', () => console.log('app run'));

// import { User } from './classes.js';
// import {
//   feedbackContainer,
//   addFeedback,
//   lightbulb,
//   numberOfSuggestions,
//   stat,
//   toggles,
//   toggleBtn,
// } from './DOMselections.js';
