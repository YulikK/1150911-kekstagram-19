'use strict';
window.photos = [];

var onDocumentClick = function (evt) {
  for (var i = 0; i < evt.path.length; i++) {
    if (evt.path[i].tagName === 'A' && evt.path[i].classList.contains('picture')) {
      window.openPreview(window.photos.find(function findObject(x) {
        return x.id === evt.path[i].id;
      }
      ));
    }
  }
};

document.addEventListener('click', onDocumentClick);
