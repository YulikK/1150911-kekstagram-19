'use strict';
(function () {

  var filterSection = document.querySelector('.img-filters');
  filterSection.classList.remove('img-filters--inactive');

  var filterId = filterSection.querySelector('.img-filters__button--active').id;

  window.updateGallery = function () {
    switch (filterId) {
      case 'filter-default':
        window.filterPhotos = window.photos.slice();
        break;
      case 'filter-discussed':
        window.filterPhotos = window.photos.slice();
        window.filterPhotos.sort(function (first, second) {
          if (first.comments.length > second.comments.length) {
            return -1;
          } else if (first.comments.length < second.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'filter-random':
        window.filterPhotos = window.photos.slice();
        for (var i = 10; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = window.filterPhotos[j];
          window.filterPhotos[j] = window.filterPhotos[i];
          window.filterPhotos[i] = temp;
        }
        window.filterPhotos = window.filterPhotos.slice(0, 10);
        break;
    }
    window.renderPhotoGalery();
  };

  var onFilterChange = window.debounce(function () {
    window.updateGallery();
  });

  var setActiveFilter = function (id) {
    if (id !== filterId) {
      var filters = filterSection.querySelectorAll('.img-filters__button');
      var filtersArray = [].map.call(filters, function (it) {
        return it;
      });
      filtersArray.forEach(function (filter) {
        if (filter.id === id) {
          filter.classList.add('img-filters__button--active');
          filterId = id;
        } else {
          filter.classList.remove('img-filters__button--active');
        }
      });

      onFilterChange();

    }
  };

  var onfilterSectionClick = function (evt) {
    if (evt.target && evt.target.matches('.img-filters__button')) {
      setActiveFilter(evt.target.id);
    }
  };

  filterSection.addEventListener('click', onfilterSectionClick);
})();
