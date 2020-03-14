'use strict';

(function () {
  var START_EFFECT_LEVEL = 100;
  var uploadSection = document.querySelector('.img-upload');
  var form = uploadSection.querySelector('.img-upload__form');
  var pinElement = uploadSection.querySelector('.effect-level__pin');
  var effectLevelLine = uploadSection.querySelector('.effect-level__line');
  var effectLeveBar = uploadSection.querySelector('.img-upload__effect-level');
  var effectLevelInput = uploadSection.querySelector('input[name="effect-level"]');
  var effectLevelDepth = uploadSection.querySelector('.effect-level__depth');
  var imgPreview = uploadSection.querySelector('.img-upload__preview');
  var effectName;
  var effectLevel;

  var cleareFilterList = function () {
    effectLevel = START_EFFECT_LEVEL;
    var filtersArray = Array.from(imgPreview.classList);
    filtersArray.forEach(function (classElement) {
      if (classElement.indexOf('--') >= 0) {
        imgPreview.classList.remove(classElement);
      }
    });
  };

  var setEffectLevel = function () {
    effectLevelInput.value = effectLevel;
    switch (effectName) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + effectLevel / 100 + ')';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(' + effectLevel / 100 + ')';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(' + effectLevel + '%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(' + effectLevel * 3 / 100 + 'px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(' + effectLevel * 3 / 100 + ')';
        break;
      case 'none':
        imgPreview.style.filter = 'none';
        break;
    }
  };

  var setVisibleLevelLine = function (visible) {
    if (visible) {
      effectLeveBar.classList.remove('hidden');
    } else {
      effectLeveBar.classList.add('hidden');
    }
  };

  var setFilter = function () {
    cleareFilterList();
    if (effectName !== 'none') {
      imgPreview.classList.add('effects__preview--' + effectName);
    }
    setEffectLevel();
    setVisibleLevelLine(effectName !== 'none');
    window.slider.setStartPosition(pinElement, effectLevelLine, effectLevel, updateEffectLevelDepth);
  };

  var onUploadFormChange = function (evt) {
    if (evt.target && evt.target.matches('input[name="effect"]')) {
      effectName = evt.target.value;
      setFilter();
    }
  };

  var updateEffect = function () {
    effectLevel = Math.round(pinElement.offsetLeft * 100 / effectLevelLine.clientWidth);
    setEffectLevel();
    updateEffectLevelDepth();
  };

  var updateEffectLevelDepth = function () {
    effectLevelDepth.style.width = pinElement.offsetLeft + 'px';
  };

  window.effect = {

    initBar: function () {

      form.addEventListener('change', onUploadFormChange);
      window.slider.init(pinElement, effectLevelLine, updateEffect);
      effectName = 'none';
      setFilter();

    },

    removeBar: function () {

      document.removeEventListener('change', onUploadFormChange);
      window.slider.remove(pinElement);
      setVisibleLevelLine(true);

    }

  };

})();
