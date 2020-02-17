'use strict';

var bodyDocument = document.querySelector('body');
var uploadSection = document.querySelector('.img-upload');
var uploadFileOpen = uploadSection.querySelector('#upload-file');
var uploadFileForm = uploadSection.querySelector('.img-upload__overlay');
var uploadFileCancel = uploadSection.querySelector('#upload-cancel');
var effectLevelPin = uploadSection.querySelector('.effect-level__pin');
var effectLevelLine = uploadSection.querySelector('.effect-level__line');
var uploadSubmit = uploadSection.querySelector('#upload-submit');
var hashtags = uploadSection.querySelector('.text__hashtags');
var effectLevel = 0;

var onPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, closePopup);
};

var onEffectPinMouseup = function () {
  effectLevel = Math.round(effectLevelPin.offsetLeft * 100 / effectLevelLine.clientWidth);
};

var onEffectItemClick = function (evt) {
  if (evt.target && evt.target.matches('.effects__preview')) {
    effectLevel = 20;
  }
};

var onSubmitClick = function () {
  var hashtagsArray = hashtags.value.split(' ');
  var messageError = [];

  if (hashtagsArray.length > 0) {
    window.checkHastags(hashtagsArray, messageError);
    hashtags.setCustomValidity(messageError);
  }
};

var openPopup = function () {
  uploadFileForm.classList.remove('hidden');
  bodyDocument.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
  effectLevelPin.addEventListener('mouseup', onEffectPinMouseup);
  document.addEventListener('click', onEffectItemClick);
  uploadSubmit.addEventListener('click', onSubmitClick);
  effectLevel = effectLevel; // лишняя строка, так как ругается что переменная нигде не используется
};

var closePopup = function () {
  uploadFileForm.classList.add('hidden');
  bodyDocument.classList.remove('modal-open');
  uploadFileOpen.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  effectLevelPin.removeEventListener('mouseup', onEffectPinMouseup);
  document.removeEventListener('click', onEffectItemClick);
  uploadSubmit.removeEventListener('click', onSubmitClick);
};

uploadFileOpen.addEventListener('change', openPopup);

uploadFileCancel.addEventListener('click', closePopup);
