'use strict';
(function () {

  var Message = {
    MISS_SIMBOL: ' Должен начинаться с символа #.',
    SHORT_WORD: ' Не может состоять только из символа #.',
    LONG_WORD: ' Не более 20 символов.',
    BAN_SIMBOL: ' Может содержать только буквы и цифры.',
    DOUBLE: ' Не должны повторяться.'
  };

  window.checkHastags = function (hashtagsArray) {
    var messageError = '';
    if (hashtagsArray.length > 5) {
      messageError += 'Не более 5 хэштегов';
    }

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hashtag = hashtagsArray[i].trim();
      var message = ((messageError.length > 0) ? ' ' : '') + 'Хэштег ' + hashtag + ' не прошел проверку:';
      var haveError = false;

      if (hashtag[0] !== '#') {
        message += Message.MISS_SIMBOL;
        haveError = true;
      }
      if (hashtag.length < 2) {
        message += Message.SHORT_WORD;
        haveError = true;
      }
      if (hashtag.length > 20) {
        message += Message.LONG_WORD;
        haveError = true;
      }
      var hashtagText = hashtag.substring(1);
      if (/[^A-Za-zА-Яа-я0-9_]/.test(hashtagText)) {
        message += Message.BAN_SIMBOL;
        haveError = true;
      }
      var haveCopy = false;
      for (var j = 0; j < i; j++) {
        if (hashtagsArray[j].toLowerCase() === hashtagsArray[i].toLowerCase()) {
          haveCopy = true;
        }
      }
      if (haveCopy) {
        message += Message.DOUBLE;
        haveError = true;
      }
      if (hashtagsArray[0] === '' && hashtagsArray.length === 1) {
        haveError = false;
      }
      if (haveError) {
        messageError += message;
      }
    }
    return messageError;
  };
})();
