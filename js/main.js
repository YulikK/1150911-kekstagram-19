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
var ESC_KEY = 'Escape';

var bodyDocument = document.querySelector('body');
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

var guidPart = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

var createGuid = function () {
  return (guidPart() + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + guidPart() + guidPart());
};

for (var i = 0; i < count; i++) {
  photos[i] = {
    id: createGuid(),
    name: 'photos/' + (i + 1) + '.jpg',
    description: PHOTO_DESCRIPTION[Math.floor(Math.random() * 5)],
    likes: Math.floor(Math.random() * 185 + 15),
    comments: getRandomComents()
  };
}

var renderFoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.id = photo.id;
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
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel');

var openPopupPhoto = function (photo) {

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
  bodyDocument.classList.add('modal-open');
  document.addEventListener('keydown', onPopupPhotoEscPress);
  bigPictureCancel.addEventListener('click', closePopupPhoto);

};

var closePopupPhoto = function () {
  bigPictureElement.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupPhotoEscPress);
  bigPictureCancel.removeEventListener('click', closePopupPhoto);
};

var uploadSection = document.querySelector('.img-upload');
var uploadFileOpen = uploadSection.querySelector('#upload-file');
var uploadFileForm = uploadSection.querySelector('.img-upload__overlay');
var uploadFileCancel = uploadSection.querySelector('#upload-cancel');
var effectLevelPin = uploadSection.querySelector('.effect-level__pin');
var effectLevelLine = uploadSection.querySelector('.effect-level__line');
var uploadSubmit = uploadSection.querySelector('#upload-submit');
var hashtags = uploadSection.querySelector('.text__hashtags');
var effectLevel = 0;

var onPopupUploadEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target && !(evt.target.matches('.text__hashtags') || evt.target.matches('.text__description'))) {
    closePopupUpload();
  }
};

var onPopupPhotoEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopupPhoto();
  }
};

var onEffectPinMouseup = function () {
  effectLevel = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.clientWidth);
};

var onEffectItemClick = function (evt) {
  if (evt.target && evt.target.matches('.effects__preview')) {
    effectLevel = 20;
  }
};

var onDocumentClick = function (evt) {
  for (i = 0; i < evt.path.length; i++) {
    if (evt.path[i].tagName === 'A' && evt.path[i].classList.contains('picture')) {
      openPopupPhoto(photos.find(x => x.id === evt.path[i].id));
    }
  }
};

var checkHastags = function (hashtagsArray, messageError) {
  if (hashtagsArray.length > 5) {
    messageError.push('Не более 5 хэштегов');
  }

  for (i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i].trim();
    var message = ((messageError.length > 0) ? ' ' : '') + 'Хэштег ' + hashtag + ' не прошел проверку:';
    var haveError = false;

    if (hashtag[0] !== '#') {
      message += ' Должен начинаться с символа #.';
      haveError = true;
    }
    if (hashtag.length < 2) {
      message += ' Не может состоять только из символа #.';
      haveError = true;
    }
    if (hashtag.length > 20) {
      message += ' Не более 20 символов.';
      haveError = true;
    }
    var hashtagText = hashtag.substring(1);
    if (/[^A-Za-z0-9_]/.test(hashtagText)) {
      message += ' Может содержать только буквы и цифры.';
      haveError = true;
    }
    var haveCopy = false;
    for (var j = 0; j < i; j++) {
      if (hashtagsArray[j].toLowerCase() === hashtagsArray[i].toLowerCase()) {
        haveCopy = true;
      }
    }
    if (haveCopy) {
      message += ' Не должны повторяться.';
      haveError = true;
    }
    if (hashtagsArray.length = 1 && hashtagsArray[0] === '') {
      haveError = false;
    }
    if (haveError) {
      messageError.push(message);
    }
  }
};

var onUploadSubmitClick = function () {
  var hashtagsArray = hashtags.value.split(' ');
  var messageError = [];

  if (hashtagsArray.length > 0) {
    checkHastags(hashtagsArray, messageError);
    hashtags.setCustomValidity(messageError);
  }
};

var openPopupUpload = function () {
  uploadFileForm.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');
  document.addEventListener('keydown', onPopupUploadEscPress);
  effectLevelPin.addEventListener('mouseup', onEffectPinMouseup);
  document.addEventListener('click', onEffectItemClick);
  uploadSubmit.addEventListener('click', onUploadSubmitClick);
  effectLevel = effectLevel; // лишняя строка, так как ругается что переменная нигде не используется
};

var closePopupUpload = function () {
  uploadFileForm.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  uploadFileOpen.value = '';
  effectLevelPin.removeEventListener('mouseup', onEffectPinMouseup);
  document.removeEventListener('click', onEffectItemClick);
  uploadSubmit.removeEventListener('click', onUploadSubmitClick);
};

uploadFileOpen.addEventListener('change', openPopupUpload);

uploadFileCancel.addEventListener('click', closePopupUpload);

document.addEventListener('click', onDocumentClick);
