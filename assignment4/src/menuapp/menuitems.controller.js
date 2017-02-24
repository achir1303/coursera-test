(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuItemsController', MenuItemsController);

// Version with resolving to 1 item based on $stateParams in route config
MenuItemsController.$inject = ['$stateParams', 'MenuDataService','items'];
function MenuItemsController($stateParams, MenuDataService,items) {
  var menuList = this;
  menuList.items = items;
  menuList.categoryname =  $stateParams.categoryname;
  //console.log($stateParams.categoryname)
}

})();
