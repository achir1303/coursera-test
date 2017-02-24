(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menuapp/templates/main-categorieslist.template.html',
  bindings: {
    categories: '<'
  }
});

})();
