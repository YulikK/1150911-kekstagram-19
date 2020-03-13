'use strict';
(function () {
  var START_SCALE = 100;
  var uploadSection = document.querySelector('.img-upload');
  var scaleSmall = uploadSection.querySelector('.scale__control--smaller');
  var scaleBig = uploadSection.querySelector('.scale__control--bigger');
  var scaleInput = uploadSection.querySelector('.scale__control--value');
  var imgPreview = uploadSection.querySelector('.img-upload__preview');
  var scale;

  var setStartScale = function () {
    scaleInput.value = START_SCALE + '%';
    scale = START_SCALE;
    setNewScale();
  };

  var setNewScale = function () {
    imgPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  var onScaleUp = function () {
    scale = Math.min(100, scale + 25);
    scaleInput.value = scale + '%';
    setNewScale();

  };

  var onScaleDown = function () {
    scale = Math.max(25, scale - 25);
    scaleInput.value = scale + '%';
    setNewScale();

  };

  window.scale = {
    initBar: function () {
      setStartScale();
      scaleSmall.addEventListener('click', onScaleDown);
      scaleBig.addEventListener('click', onScaleUp);
    },

    removeBar: function () {
      scaleSmall.removeEventListener('click', onScaleDown);
      scaleBig.removeEventListener('click', onScaleUp);
    }
  };
})();
