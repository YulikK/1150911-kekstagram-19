'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadSection = document.querySelector('.img-upload');
  var fileChooser = uploadSection.querySelector('input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');

  var onFileChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var showPhoto = function () {
        preview.src = reader.result;
        reader.removeEventListener('load', showPhoto);
      };

      reader.addEventListener('load', showPhoto);

      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onFileChange);
})();
