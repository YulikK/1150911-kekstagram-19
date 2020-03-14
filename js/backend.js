'use strict';

window.backend = function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var Metods = {
    LOAD: 'GET',
    SAVE: 'POST'
  };

  var createXhrObject = function (onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var claereEvents = function () {
      xhr.removeEventListener('load', onXhrLoad);
      xhr.removeEventListener('error', onXhrError);
      xhr.removeEventListener('timeout', onXhrTimeout);
    };

    var onXhrLoad = function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      claereEvents();
    };

    var onXhrError = function () {
      onError('Произошла ошибка соединения');
      claereEvents();
    };

    var onXhrTimeout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      claereEvents();
    };

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.timeout = TIMEOUT_IN_MS;

    switch (method) {
      case 'GET':
        xhr.open('GET', URL_LOAD);
        xhr.send();
        break;
      case 'POST':
        xhr.open('POST', URL_SAVE);
        xhr.send(data);
        break;
    }
  };

  return {
    load: function (onSuccess, onError) {

      createXhrObject(onSuccess, onError, Metods.LOAD);

    },

    save: function (data, onSuccess, onError) {

      createXhrObject(onSuccess, onError, Metods.SAVE, data);

    }
  };
}();
