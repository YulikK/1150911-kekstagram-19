'use strict';
var photos = [];
var count = 25;
var COMMENT_MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAME = ['Магда', 'Гавриил', 'Самсон', 'Ромул', 'Елисей', 'Имам'];
var PHOTO_DESCRIPTION = ['Вот оно',
  'Завидуйте)',
  'я любимый!',
  'Целую',
  'Жду',
  'Мой'];

var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var photoListElement = document.querySelector('.pictures');
var getRandomComents = function () {
  var countMessage = Math.floor(Math.random() * 4 + 1);
  var messages = [];
  for (var i = 0; i < countMessage; i++) {
    messages[i] = {
      avatar: 'img/avatar-' + Math.floor(Math.random() * 5 + 1) + '.svg',
      message: COMMENT_MESSAGE[Math.floor(Math.random() * 5 + 1)],
      name: COMMENT_NAME[Math.floor(Math.random() * 5 + 1)]
    };
  }
  return messages;
};

for (var i = 0; i < count; i++) {
  photos[i] = {
    name: 'photos/' + (i + 1) + '.jpg',
    description: PHOTO_DESCRIPTION[Math.floor(Math.random() * 5)],
    likes: Math.floor(Math.random() * 185 + 15),
    comments: getRandomComents()
  };
}

var renderFoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.name;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < photos.length; i++) {
  fragment.appendChild(renderFoto(photos[i]));
}

photoListElement.appendChild(fragment);

var openPhotoWindow = function (photo) {

  var bigPictureElement = document.querySelector('.big-picture');

  document.querySelector('.big-picture__img img').src = photo.name;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;

  var commentTemplate = document.querySelector('.social__comment');

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentElement.querySelector('.social__picture').alt = comment.name;

    return commentElement;
  };

  var renderCommentsList = function (commentsList) {

    var socialCommentsList = document.querySelector('.social__comments');
    socialCommentsList.innerHTML = '';

    var fragmentCommet = document.createDocumentFragment();

    for (i = 0; i < commentsList.length; i++) {
      fragmentCommet.appendChild(renderComment(commentsList[i]));
    }

    socialCommentsList.appendChild(fragmentCommet);
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');
    var commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.add('hidden');
  };

  renderCommentsList(photo.comments);
  bigPictureElement.classList.remove('hidden');
};

openPhotoWindow(photos[0]);
