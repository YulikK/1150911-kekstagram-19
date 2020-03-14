'use strict';

window.backend = function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

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

      var claereEvents = function () {
        xhr.removeEventListener('load', onXhrLoad);
        xhr.removeEventListener('error', onXhrError);
        xhr.removeEventListener('timeout', onXhrTimeout);
      };

      xhr.addEventListener('load', onXhrLoad);
      xhr.addEventListener('error', onXhrError);
      xhr.addEventListener('timeout', onXhrTimeout);

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var cleareEvents = function () {
        xhr.addEventListener('load', onXhrLoad);
        xhr.addEventListener('error', onXhrError);
        xhr.addEventListener('timeout', onXhrTimeout);
      };

      var onXhrLoad = function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess();
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        cleareEvents();
      };

      var onXhrError = function () {
        onError('Произошла ошибка соединения');
        cleareEvents();
      };

      var onXhrTimeout = function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        cleareEvents();
      };

      xhr.addEventListener('load', onXhrLoad);
      xhr.addEventListener('error', onXhrError);
      xhr.addEventListener('timeout', onXhrTimeout);

      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
}();
