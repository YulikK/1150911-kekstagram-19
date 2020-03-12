'use strict';

var bodyDocument = document.querySelector('body');
var uploadSection = document.querySelector('.img-upload');
var uploadFileOpen = uploadSection.querySelector('#upload-file');
var uploadFileForm = uploadSection.querySelector('.img-upload__overlay');
var uploadFileCancel = uploadSection.querySelector('#upload-cancel');
var uploadForm = uploadSection.querySelector('#upload-select-image');
// var effectLevelPin = uploadSection.querySelector('.effect-level__pin');
// var effectLevelLine = uploadSection.querySelector('.effect-level__line');
var uploadSubmit = uploadSection.querySelector('#upload-submit');
var hashtags = uploadSection.querySelector('.text__hashtags');
// effectLevel = 0;

var onUploadPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, closeUploadPopup);
};

var onSuccessPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, window.closeSuccessPopup);
};

var onErrorPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, window.closeErrorPopup);
};

// var onEffectPinMouseup = function () {
//   effectLevel = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.clientWidth);
// };

// var onEffectItemClick = function (evt) {
//   if (evt.target && evt.target.matches('.effects__preview')) {
//     effectLevel = 20;
//   }
// };

window.closeSuccessPopup = function () {
  var successElement = bodyDocument.querySelector('.success');
  bodyDocument.classList.remove('modal-open');
  var successCancel = bodyDocument.querySelector('.success__button');
  successCancel.removeEventListener('click', window.closeSuccessPopup);
  document.removeEventListener('keydown', onSuccessPopupEscPress);
  successElement.remove();
};

window.closeErrorPopup = function () {
  var errorElement = bodyDocument.querySelector('.error');
  bodyDocument.classList.remove('modal-open');
  var errorCancel = bodyDocument.querySelector('.error__button');
  errorCancel.removeEventListener('click', window.closeErrorPopup);
  document.removeEventListener('keydown', onErrorPopupEscPress);
  errorElement.remove();
};

var openSuccessPopup = function () {

  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var main = bodyDocument.querySelector('main');
  var successElement = successTemplate.cloneNode(true);
  main.appendChild(successElement);
  bodyDocument.classList.add('modal-open');
  var successCancel = bodyDocument.querySelector('.success__button');
  successCancel.addEventListener('click', window.closeSuccessPopup);
  document.addEventListener('keydown', onSuccessPopupEscPress);
};

var openErrorPopup = function () {

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var main = bodyDocument.querySelector('main');
  var errorElement = errorTemplate.cloneNode(true);
  main.appendChild(errorElement);
  bodyDocument.classList.add('modal-open');
  var errorCancel = bodyDocument.querySelector('.error__button');
  errorCancel.addEventListener('click', window.closeErrorPopup);
  document.addEventListener('keydown', onErrorPopupEscPress);
};

var onSubmitClick = function (evt) {
  var hashtagsArray = hashtags.value.split(' ');
  var messageError = [];

  if (hashtagsArray.length > 0) {
    window.checkHastags(hashtagsArray, messageError);
    hashtags.setCustomValidity(messageError);
  }

  window.backend.save(new FormData(uploadForm), function () {
    closeUploadPopup();
    openSuccessPopup();
  }, function () {
    closeUploadPopup();
    openErrorPopup();
  });
  evt.preventDefault();
};

var openUploadPopup = function () {
  uploadFileForm.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');
  document.addEventListener('keydown', onUploadPopupEscPress);
  // effectLevelPin.addEventListener('mouseup', onEffectPinMouseup);
  // document.addEventListener('click', onEffectItemClick);
  uploadSubmit.addEventListener('click', onSubmitClick);
  // effectLevel = effectLevel; // лишняя строка, так как ругается что переменная нигде не используется
  window.initEffectsBar();
};

var closeUploadPopup = function () {
  uploadFileForm.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  uploadFileOpen.value = '';
  uploadForm.reset();
  document.removeEventListener('keydown', onUploadPopupEscPress);
  // effectLevelPin.removeEventListener('mouseup', onEffectPinMouseup);
  // document.removeEventListener('click', onEffectItemClick);
  uploadSubmit.removeEventListener('click', onSubmitClick);
};

uploadFileOpen.addEventListener('change', openUploadPopup);

uploadFileCancel.addEventListener('click', closeUploadPopup);
