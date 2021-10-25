'use strict';

class User {
  constructor(name, uName, pass, img = './assets/user-images/poop.jpg') {
    this.image = img;
    this.name = name;
    this.username = uName;
    this.password = pass;
    this.suggestionsLimit = 4;
  }
}

class Suggestion {
  // "id": 1,
  // "title": "Add tags for solutions",
  // "category": "enhancement",
  // "upvotes": 112,
  // "status": "suggestion",
  // "description": "Easier to search for solutions based on a specific stack.",
  constructor(title, category, status, desc) {
    this.id;
    this.title = title;
    this.category = category;
    this.status = status;
    this.desc = desc;
    this.upvotes = 0;
  }
}

class Comment {
  // "id": 2,
  // "content": "Please use fun, color-coded labels to easily identify them at a glance",
  // "user": {
  //   "image": "./assets/user-images/image-thomas.jpg",
  //   "name": "Thomas Hood",
  //   "username": "brawnybrave"
  // }
  constructor(content) {
    this.id;
    this.content = content;
    this.user;
  }
}

class Reply extends Comment {
  // "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
  // "replyingTo": "hummingbird1",
  // "user": {
  //   "image": "./assets/user-images/image-anne.jpg",
  //   "name": "Anne Valentine",
  //   "username": "annev1990"
  // }
  constructor(to, content) {
    super(content);
    this.replyingTo = to;
  }
}

export { User, Suggestion, Comment, Reply };
