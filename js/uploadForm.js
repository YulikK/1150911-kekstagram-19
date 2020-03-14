'use strict';
(function () {
  var bodyDocument = document.querySelector('body');
  var uploadSection = document.querySelector('.img-upload');
  var uploadFileOpen = uploadSection.querySelector('#upload-file');
  var uploadFileForm = uploadSection.querySelector('.img-upload__overlay');
  var uploadFileCancel = uploadSection.querySelector('#upload-cancel');
  var uploadForm = uploadSection.querySelector('#upload-select-image');
  var uploadSubmit = uploadSection.querySelector('#upload-submit');
  var hashtags = uploadSection.querySelector('.text__hashtags');

  var onUploadPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUploadPopup);
  };

  var onSuccessPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.closeSuccessPopup);
  };

  var onErrorPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.closeErrorPopup);
  };

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
    var messageError = '';

    if (hashtagsArray.length > 0) {
      messageError = window.checkHastags(hashtagsArray);
      hashtags.setCustomValidity(messageError);
    }

    if (messageError.length === 0) {
      hashtags.style = '';
      window.backend.save(new FormData(uploadForm), function () {
        closeUploadPopup();
        openSuccessPopup();
      }, function () {
        closeUploadPopup();
        openErrorPopup();
      });
      evt.preventDefault();
    } else {
      hashtags.style.border = '1px solid red';
    }
  };

  var openUploadPopup = function () {
    uploadFileForm.classList.remove('hidden');
    bodyDocument.classList.add('modal-open');
    document.addEventListener('keydown', onUploadPopupEscPress);
    uploadSubmit.addEventListener('click', onSubmitClick);
    window.effect.initBar();
    window.scale.initBar();
    uploadFileCancel.addEventListener('click', closeUploadPopup);
  };

  var closeUploadPopup = function () {
    uploadFileForm.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
    uploadFileOpen.value = '';
    uploadForm.reset();
    document.removeEventListener('keydown', onUploadPopupEscPress);
    uploadFileCancel.removeEventListener('click', closeUploadPopup);
    uploadSubmit.removeEventListener('click', onSubmitClick);
    window.effect.removeBar();
    window.scale.removeBar();
  };

  uploadFileOpen.addEventListener('change', openUploadPopup);
})();
