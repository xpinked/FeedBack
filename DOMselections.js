const feedbackContainer = document.querySelector('.suggestions-feedbacks');
const addFeedback = document.querySelector('.btn--add-fedback');
const lightbulb = document.querySelector('.lightbulb');
const numberOfSuggestions = document.querySelector('.number-of-suggestions');
const stat = st => document.querySelector(`.status--${st}`);
const toggles = document.querySelector(`.toggles`);
const toggleBtn = toggle => document.querySelector(`.toggle--${toggle}`);

export {
  feedbackContainer,
  addFeedback,
  lightbulb,
  numberOfSuggestions,
  stat,
  toggles,
  toggleBtn,
};
