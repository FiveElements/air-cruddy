'use strict';

module.exports = function (plugin, options, next) {
  console.log('Statics initialisation');
  return [
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '..',
          listing: true
        }
      }
    }
  ];

}();
