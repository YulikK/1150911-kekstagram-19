'use strict';
(function () {
  // var count = 25;
  // var COMMENT_MESSAGE = ['Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  // var COMMENT_NAME = ['Магда', 'Гавриил', 'Самсон', 'Ромул', 'Елисей', 'Имам'];
  // var PHOTO_DESCRIPTION = ['Вот оно',
  //   'Завидуйте)',
  //   'я любимый!',
  //   'Целую',
  //   'Жду',
  //   'Мой'];

  // var getRandomComents = function () {
  //   var countMessage = Math.floor(Math.random() * 4 + 1);
  //   var messages = [];
  //   for (var i = 0; i < countMessage; i++) {
  //     messages.push({
  //       avatar: 'img/avatar-' + Math.floor(Math.random() * 5 + 1) + '.svg',
  //       message: COMMENT_MESSAGE[Math.floor(Math.random() * 5 + 1)],
  //       name: COMMENT_NAME[Math.floor(Math.random() * 5 + 1)]
  //     });
  //   }
  //   return messages;
  // };

  var guidPart = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  var createGuid = function () {
    return (guidPart() + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + '-' + guidPart() + guidPart() + guidPart());
  };

  // for (var i = 0; i < count; i++) {
  //   window.photos.push({
  //     id: createGuid(),
  //     name: 'photos/' + (i + 1) + '.jpg',
  //     description: PHOTO_DESCRIPTION[Math.floor(Math.random() * 5)],
  //     likes: Math.floor(Math.random() * 185 + 15),
  //     comments: getRandomComents()
  //   });
  // }
  var successHandler = function (photos) {

    for (var i = 0; i < photos.length; i++) {
      window.photos.push({
        id: createGuid(),
        name: photos[i].url,
        description: photos[i].description,
        likes: photos[i].likes,
        comments: photos[i].comments
      });
    }

    window.renderPhotoGalery();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
