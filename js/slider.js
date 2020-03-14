'use strict';
(function () {
  var maxMove;
  var parentCoords;
  var updateInformation;
  var pinElement;

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset
    };
  };

  var onSliderMouseDown = function (evt) {
    evt.preventDefault();

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var newPosition = moveEvt.clientX - parentCoords.left;

      if (moveEvt.pageX < parentCoords.left) {
        newPosition = 0;
      }

      if (moveEvt.pageX > parentCoords.left + maxMove) {
        newPosition = maxMove;
      }

      pinElement.style.left = newPosition + 'px';

      updateInformation();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinElement.removeEventListener('click', onClickPreventDefault);
        };
        pinElement.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.slider = {
    init: function (element, parent, cb) {
      pinElement = element;
      maxMove = parent.offsetWidth;
      parentCoords = getCoords(parent);
      updateInformation = cb;
      element.addEventListener('mousedown', onSliderMouseDown);
    },

    remove: function (element) {
      element.removeEventListener('mousedown', onSliderMouseDown);
    },
    setStartPosition: function (element, parent, effectLevel, cb) {
      maxMove = parent.offsetWidth;
      element.style.left = (maxMove * effectLevel / 100) + 'px';
      cb();
    }
  };
})();
