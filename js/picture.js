'use strict';
(function () {
  window.renderPhotoGalery = function () {
    var photoListElement = document.querySelector('.pictures');
    var photoTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture');

    var photos = document.querySelectorAll('.picture');
    if (photos) {
      var photosArray = [].map.call(photos, function (it) {
        return it;
      });
      photosArray.forEach(function (photoElement) {
        photoElement.remove();
      });
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

    window.filterPhotos.forEach(function (photo) {
      fragment.appendChild(renderFoto(photo));
    });

    photoListElement.appendChild(fragment);
  };
})();
