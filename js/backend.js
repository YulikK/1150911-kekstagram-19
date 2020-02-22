'use strict';

window.backend = function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  // var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  return {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }

    //   save: function (data, onSuccess, onError) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'json';

    //     xhr.addEventListener('load', function () {
    //       if (xhr.status === StatusCode.OK) {
    //         onSuccess();
    //       } else {
    //         onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    //       }
    //     });

    //     xhr.addEventListener('error', function () {
    //       onError('Произошла ошибка соединения');
    //     });

    //     xhr.addEventListener('timeout', function () {
    //       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    //     });

    //     xhr.timeout = TIMEOUT_IN_MS;
    //     xhr.open('POST', URL_SAVE);
    //     xhr.send(data);
    //   }
  };
}();
