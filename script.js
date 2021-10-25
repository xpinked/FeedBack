'use strict';

import { User, Suggestion, Comment, Reply } from './classes.js';
import {
  feedbackContainer,
  addFeedback,
  lightbulb,
  numberOfSuggestions,
  stat,
  toggles,
  toggleBtn,
} from './DOMselections.js';

function getReply(reply, to) {
  // "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
  // "replyingTo": "hummingbird1",
  // "user": {
  //   "image": "./assets/user-images/image-anne.jpg",
  //   "name": "Anne Valentine",
  //   "username": "annev1990"
  // }
  const recurseReplies = reply?.replies;
  const { content, replyingTo, user } = reply;
  const { image, name } = user;
  const html = `
  <div class="reply flex">
    <figure style="background-color:inherit;" class="profile-img btn flex flex--column flex--justify">
      <img style="width:40px; height:auto; border-radius: 50%; border: 1.5px solid black" src=${image}>
    </figure>

    <div class="reply-content">
      <h2 class="reply-title heading-primary">${name} <span style="font-size: 1.5rem; font-weight:500;">Replies ${replyingTo}</span></h2>
      <p class="reply-text">
        ${content}
      </p>
    </div>
  </div>
  `;
  to.insertAdjacentHTML('beforeend', html);
  if (recurseReplies) {
    const replies = to.querySelectorAll('.reply');
    const currentReply = replies[replies.length - 1];
    addRepliesContainer(currentReply);
    const newRepliesContainer = currentReply.nextElementSibling;
    getReplies(recurseReplies, newRepliesContainer);
  }
}

function getReplies(replies, to) {
  replies?.forEach(reply => getReply(reply, to));
}

function getComments(comments, to) {
  comments?.forEach(comment => {
    const replies = comment.replies;
    getComment(comment, to);
    if (replies) {
      addRepliesContainer(to);
      const repliesContainer = document.querySelector('.replies-container');
      getReplies(replies, repliesContainer);
    }
  });
}

function getComment(comment, to) {
  const { content, user } = comment;
  const { image, name } = user;
  const html = `
      <div class="comment flex">
        <figure style="background-color:inherit;" class="profile-img btn flex flex--column flex--justify">
          <img style="width:60px; height:auto; border-radius: 50%; border: 1.5px solid black" src=${image}>
        </figure>

        <div class="comment-content">
          <h2 class="comment-title heading-primary">${name}</h2>
          <p class="comment-text">
            ${content}
          </p>
        </div>
      </div>
      `;
  to?.insertAdjacentHTML('afterbegin', html);
}

function rednerSuggestion(suggestion) {
  const html = `  
  <div class="feedback container--inner flex" data-id=${suggestion.id - 1}>
  <div class="upvote btn flex flex--column flex--justify">
    <p>
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6l4-4 4 4"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
    </p>
    <p>${(suggestion?.upvotes + '')?.padStart(3, '0') ?? '000'}</p>
  </div>

  <div class="feedback-content">
    <h2 class="feedback-title heading-primary">${suggestion.title}</h2>
      <p class="feedback-text">
      ${suggestion?.description}
      </p>
      <div class="feedback-tags list list--row">
       <li><a class="btn" href="#"> ${
         suggestion?.category[0]?.toUpperCase() + suggestion?.category?.slice(1)
       }</a></li>
      </div>
    </div>
    <div class="comments flex">
    <img
    type="image/svg+xml" class="comment-it" 
    src="./assets/shared/icon-comments.svg"
    />
      <span>${suggestion?.comments?.length ?? '0'}</span>
    </div>
  </div>`;
  feedbackContainer.insertAdjacentHTML('beforeend', html);
}

function addCommentsContainer(to) {
  const html = `<div class="comments-container grid"></div>`;
  to.insertAdjacentHTML('afterend', html);
}

function addRepliesContainer(to) {
  const html = `<div class="replies-container grid"></div>`;
  to.insertAdjacentHTML('afterend', html);
}

function getSuggestionDetails(data, id) {
  const suggestion = data?.productRequests[id];
  const comments = suggestion?.comments;
  if (comments) {
    feedbackContainer.innerHTML = '';
    rednerSuggestion(suggestion);
    const suggestionContainer = document.querySelector('.feedback');
    addCommentsContainer(suggestionContainer);
    const commentsContainer = document.querySelector('.comments-container');
    getComments(comments, commentsContainer);
    lightbulb.classList.add('clickable');
    lightbulb.src = './assets/shared/icon-arrow-left.svg';
  }
}

function requireDetails(data) {
  // let feedbacks = document.querySelectorAll('.feedback');
  // feedbacks.forEach(function (el) {
  //   el.querySelector('.feedback-title').addEventListener('click', () =>
  //     getSuggestionDetails(data, el.id)
  //   );
  //   el.querySelector('.comment-it').addEventListener('click', () =>
  //     getSuggestionDetails(data, el.id)
  //   );
  // });

  feedbackContainer.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('feedback-title') ||
      e.target.classList.contains('comment-it')
    ) {
      getSuggestionDetails(
        data,
        +e.target.parentElement.parentElement.dataset.id
      );
    }
  });
}

function populateSuggestions(data, start = 0, end = 0) {
  const limit = data?.currentUser?.suggestionsLimit;
  const length = data?.productRequests?.length;
  const arrayData = data?.productRequests;
  if (start === 0 && end === 0) toggles.dataset.page = 0;
  if (arrayData) {
    feedbackContainer.innerHTML = '';
    // prettier-ignore
    let suggestions = arrayData?.slice(-(limit + start),length - end).reverse().filter((_, index) => index < limit);
    numberOfSuggestions.textContent = `${suggestions?.length}`;

    suggestions?.forEach(suggestion => rednerSuggestion(suggestion));
    requireDetails(data);
  }
}

function populateSidebarRoadmap(data) {
  stat('planned').textContent = data.productRequests.filter(
    e => e.status === 'planned'
  ).length;
  stat('in-progress').textContent = data.productRequests.filter(
    e => e.status === 'in-progress'
  ).length;
  stat('live').textContent = data.productRequests.filter(
    e => e.status === 'live'
  ).length;
}

function testAddSuggestion() {
  const html = `
  <div class="feedback container--inner flex">
  <div class="upvote btn flex flex--column flex--justify">
    <p>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6l4-4 4 4"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
    </p>
    <p>020</p>
  </div>

  <div class="feedback-content">
    <h2 class="feedback-title heading-primary">Give me a title</h2>
    <p class="feedback-text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Repudiandae aut ratione.
    </p>
    <div class="feedback-tags list list--row">
      <li><a class="btn" href="#">Feature</a></li>
    </div>
  </div>
  <div class="comments flex">
    <img
      type="image/svg+xml"
      src="./assets/shared/icon-comments.svg"
    />
    <span>2</span>
  </div>
</div>`;
  feedbackContainer.insertAdjacentHTML('afterbegin', html);
  numberOfSuggestions.textContent = `${+numberOfSuggestions.textContent + 1}`;
}

function toggleSuggestion(data, toggle) {
  const pages =
    data?.productRequests?.length % data?.currentUser?.suggestionsLimit === 0
      ? data?.productRequests?.length / data?.currentUser?.suggestionsLimit
      : Math.ceil(
          data?.productRequests?.length / data?.currentUser?.suggestionsLimit
        );
  const notToggableNext = +toggles.dataset.page + 1 >= pages;

  const notToggablePrev = +toggles.dataset.page - 1 < 0;

  if (toggle === 'next') {
    toggles.dataset.page = +toggles.dataset.page + (notToggableNext ? 0 : 1);
  } else if (toggle === 'prev') {
    toggles.dataset.page = +toggles.dataset.page - (notToggablePrev ? 0 : 1);
  }
  if (!notToggablePrev || !notToggableNext) {
    populateSuggestions(
      data,
      data.currentUser.suggestionsLimit * toggles.dataset.page,
      data.currentUser.suggestionsLimit * toggles.dataset.page
    );
  }
}

function returnBtn(data) {
  lightbulb.addEventListener('click', function () {
    lightbulb.classList.remove('clickable');
    lightbulb.src = './assets/suggestions/icon-suggestions.svg';
    populateSuggestions(
      data,
      data.currentUser?.suggestionsLimit * toggles.dataset.page,
      data.currentUser?.suggestionsLimit * toggles.dataset.page
    );
  });
}

const mainPage = function (data) {
  //all function to load main page
  //populateCurrentAcc();
  //populateSidebarTags();
  populateSidebarRoadmap(data);
  populateSuggestions(data);
  toggleBtn('next').addEventListener('click', () =>
    toggleSuggestion(data, 'next')
  );
  toggleBtn('prev').addEventListener('click', () =>
    toggleSuggestion(data, 'prev')
  );
  returnBtn(data);
  addFeedback.addEventListener('click', testAddSuggestion);
};

const loadPage = async function (runPage) {
  let requestURL = './data.json';
  let response = await fetch(requestURL);
  let data = await response.json();
  console.log(data);
  runPage(data);
};

loadPage(mainPage);
