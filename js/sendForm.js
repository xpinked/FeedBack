'use strict';
import {
  feedbackContainer,
  addFeedback,
  lightbulb,
  numberOfSuggestions,
  stat,
  toggles,
  toggleBtn,
} from '../DOMselections.js';

{
  /* <input type="text" id="title">
<label for="category" >Category</label>
<input type="text" id="category">
<label for="status" >Status</label>
<input type="text" id="status">
<label for="desc" >Description</label>
<input type="text" id="desc"> */
}
const formBtn = document.querySelector('#formBtn');
const title = document.querySelector('#title');
const category = document.querySelector('#category');
const status = document.querySelector('#status');
const desc = document.querySelector('#desc');

formBtn.addEventListener('click', e => e);
