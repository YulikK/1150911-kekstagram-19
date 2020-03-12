'use strict';

var uploadSection = document.querySelector('.img-upload');
var form = uploadSection.querySelector('.img-upload__form');
var pinElement = uploadSection.querySelector('.effect-level__pin');
var effectLevelLine = uploadSection.querySelector('.effect-level__line');
var effectLeveBar = uploadSection.querySelector('.img-upload__effect-level');
var effectLevel = uploadSection.querySelector('input[name="effect-level"]');
var effectLevelDepth = uploadSection.querySelector('.effect-level__depth');
var imgPreview = uploadSection.querySelector('.img-upload__preview');
var activeEffect = 'none';
var START_EFFECT_LEVEL = 100;

effectLevel.value = START_EFFECT_LEVEL;

var onEffectPinMouseup = function () {
  effectLevel.value = Math.round(pinElement.offsetLeft * 100 / effectLevelLine.clientWidth);
};

var cleareFilterList = function () {
  var filterArray = Array.from(imgPreview.classList);
  filterArray.forEach(function (classElement) {
    if (classElement.indexOf('--') >= 0) {
      imgPreview.classList.remove(classElement);
    }
  });
};

var setEffectLevel = function () {
  switch (activeEffect) {
    case 'chrome':
      imgPreview.style.filter = 'grayscale(' + effectLevel.value / 100 + ')';
      break;
    case 'sepia':
      imgPreview.style.filter = 'sepia(' + effectLevel.value / 100 + ')';
      break;
    case 'marvin':
      imgPreview.style.filter = 'invert(' + effectLevel.value + '%)';
      break;
    case 'phobos':
      imgPreview.style.filter = 'blur(' + effectLevel.value * 3 / 100 + 'px)';
      break;
    case 'heat':
      imgPreview.style.filter = 'brightness(' + effectLevel.value * 3 / 100 + ')';
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
  if (activeEffect !== 'none') {
    imgPreview.classList.add('effects__preview--' + activeEffect);
    effectLevel.value = START_EFFECT_LEVEL;
  }
  setEffectLevel();
  setVisibleLevelLine(activeEffect !== 'none');
};

var onUploadFormChange = function (evt) {
  if (evt.target && evt.target.matches('input[name="effect"]')) {
    activeEffect = evt.target.value;
    setFilter();
  }
};

var updateEffect = function () {
  effectLevel.value = Math.round(pinElement.offsetLeft * 100 / effectLevelLine.clientWidth);
  effectLevelDepth.style.width = pinElement.offsetLeft + 'px';
  setEffectLevel();
};

window.initEffectsBar = function () {

  pinElement.addEventListener('mouseup', onEffectPinMouseup);
  form.addEventListener('change', onUploadFormChange);
  window.initSlider(pinElement, effectLevelLine, updateEffect);
  effectLevel.value = START_EFFECT_LEVEL;
  window.setStartPosition(pinElement, effectLevelLine, effectLevel.value, updateEffect);
  setVisibleLevelLine(activeEffect !== 'none');
};

window.removeEffectsBar = function () {

  pinElement.removeEventListener('mouseup', onEffectPinMouseup);
  document.removeEventListener('change', onUploadFormChange);

};
