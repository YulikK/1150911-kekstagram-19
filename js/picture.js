'use strict';
window.renderPhotoGalery = function () {
  var photoListElement = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');


  var renderFoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.id = photo.id;
    photoElement.querySelector('.picture__img').src = photo.name;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var fragment = document.createDocumentFragment();


  for (var i = 0; i < window.photos.length; i++) {
    fragment.appendChild(renderFoto(window.photos[i]));
  }

  photoListElement.appendChild(fragment);
};
