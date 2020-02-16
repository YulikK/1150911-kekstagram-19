'use strict';

window.checkHastags = function (hashtagsArray, messageError) {
  if (hashtagsArray.length > 5) {
    messageError.push('Не более 5 хэштегов');
  }

  for (var i = 0; i < hashtagsArray.length; i++) {
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
    if (hashtagsArray[0] === '' && hashtagsArray.length === 1) {
      haveError = false;
    }
    if (haveError) {
      messageError.push(message);
    }
  }
};
