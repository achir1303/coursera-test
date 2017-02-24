(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesListController', MainCategoriesListController);


MainCategoriesListController.$inject = ['MenuDataService','categories'];
function MainCategoriesListController(MenuDataService, categories) {
  var mainList = this;
  mainList.categories = categories;
  //console.log(categories)
}

})();
