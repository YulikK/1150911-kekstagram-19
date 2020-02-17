'use strict';
var bigPictureElement = document.querySelector('.big-picture');
var bodyDocument = document.querySelector('body');
var previewCancel = document.querySelector('.big-picture__cancel');
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

  for (var i = 0; i < commentsList.length; i++) {
    fragmentCommet.appendChild(renderComment(commentsList[i]));
  }

  socialCommentsList.appendChild(fragmentCommet);

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  var commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');
};

window.openPreview = function (photo) {

  document.querySelector('.big-picture__img img').src = photo.name;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;

  renderCommentsList(photo.comments);

  bigPictureElement.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');

  document.addEventListener('keydown', onPreviewEscPress);
  previewCancel.addEventListener('click', closePreview);

};

var closePreview = function () {
  bigPictureElement.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');

  document.removeEventListener('keydown', onPreviewEscPress);
  previewCancel.removeEventListener('click', closePreview);
};

var onPreviewEscPress = function (evt) {
  window.util.isEscEvent(evt, closePreview);
};
