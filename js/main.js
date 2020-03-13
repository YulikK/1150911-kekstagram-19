'use strict';
(function () {
  window.photos = [];
  window.filterPhotos = [];

  var onDocumentClick = function (evt) {
    var bodyDocument = document.querySelector('body');
    var successElement = bodyDocument.querySelector('.success');
    var errorElement = bodyDocument.querySelector('.error');
    if (successElement) {
      window.closeSuccessPopup();
    } else if (errorElement) {
      window.closeErrorPopup();
    } else {
      for (var i = 0; i < evt.path.length; i++) {
        if (evt.path[i].tagName === 'A' && evt.path[i].classList.contains('picture')) {
          window.openPreview(window.photos.find(function findObject(x) {
            return x.id === evt.path[i].id;
          }
          ));
        }
      }
    }
  };

  document.addEventListener('click', onDocumentClick);
})();
