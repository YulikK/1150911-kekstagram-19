'use strict';
(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bodyDocument = document.querySelector('body');
  var previewCancel = document.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');
  var MAX_COMMENTS = 5;
  var commentsList;

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentElement.querySelector('.social__picture').alt = comment.name;

    return commentElement;
  };

  var updateCommentsList = function () {

    var socialCommentsList = document.querySelector('.social__comments');
    socialCommentsList.innerHTML = '';
    commentsLoader.classList.remove('hidden');
  };

  var renderCommentsList = function () {

    var socialCommentsList = document.querySelector('.social__comments');

    var commetsNow = socialCommentsList.childElementCount;
    var commentsCount = Math.min(commentsList.length - commetsNow, MAX_COMMENTS);
    var fragmentCommet = document.createDocumentFragment();

    for (var i = commetsNow; i < commetsNow + commentsCount; i++) {
      fragmentCommet.appendChild(renderComment(commentsList[i]));
    }

    socialCommentsList.appendChild(fragmentCommet);

    if (socialCommentsList.childElementCount === commentsList.length) {
      commentsLoader.classList.add('hidden');
    }
    var commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.add('hidden');
  };

  window.openPreview = function (photo) {

    document.querySelector('.big-picture__img img').src = photo.name;
    document.querySelector('.social__caption').textContent = photo.description;
    document.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('.comments-count').textContent = photo.comments.length;

    commentsList = photo.comments;

    updateCommentsList();
    renderCommentsList();

    bigPictureElement.classList.remove('hidden');
    bodyDocument.classList.add('modal-open');

    document.addEventListener('keydown', onPreviewEscPress);
    previewCancel.addEventListener('click', closePreview);
    commentsLoader.addEventListener('click', renderCommentsList);

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
})();
