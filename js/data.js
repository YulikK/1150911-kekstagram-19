'use strict';
(function () {
  var guidPart = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  var createGuid = function () {
    return (guidPart() + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + guidPart() + guidPart());
  };

  var successHandler = function (photos) {

    photos.forEach(function (photo) {
      window.photos.push({
        id: createGuid(),
        name: photo.url,
        description: photo.description,
        likes: photo.likes,
        comments: photo.comments
      });
    });

    window.updateGallery();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
