'use strict';

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    left: box.left + pageXOffset
  };
};

window.setStartPosition = function (element, parent, effectLevel, cb) {
  var maxMove = parent.offsetWidth;
  element.style.left = (maxMove * effectLevel / 100) + 'px';
  cb();
};

window.initSlider = function (element, parent, cb) {

  var maxMove = parent.offsetWidth;
  var parentCoords = getCoords(parent);

  element.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shiftX = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      var newPosition = element.offsetLeft - shiftX;

      if (moveEvt.pageX < parentCoords.left) {
        newPosition = 0;
      }

      if (moveEvt.pageX > parentCoords.left + maxMove) {
        newPosition = maxMove;
      }

      element.style.left = newPosition + 'px';

      cb();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          element.removeEventListener('click', onClickPreventDefault);
        };
        element.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

};
