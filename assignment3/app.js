(function () {
'use strict';

angular.module('ChineseMenuApp', [])
.controller('ChineseMenuController', ChineseMenuController)
.service('ChineseMenuService', ChineseMenuService)
.directive('foundItems', FoundListDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


function FoundListDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      menuItems: '<',
      onRemove: '&'
    },
    controller: FoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundListDirectiveController() {
  var list = this;

  list.itemsInList = function () {
    if(list.menuItems.length > 0){
      return true;
    }
    return false;
  };
}


ChineseMenuController.$inject = ['ChineseMenuService'];
function ChineseMenuController(ChineseMenuService) {
  var list = this;

  list.menuItems = ChineseMenuService.getItems();


  list.findItems = function(searchTerm) {
  ChineseMenuService.clearItems();
  list.menuItems = ChineseMenuService.getItems();

  var promise = ChineseMenuService.getMenuItems();

  promise.then(function (response) {
   

if(list.searchTerm !== undefined && list.searchTerm !== "") {

    for(var i=0;i < response.data.menu_items.length;i++) {
      var desc = response.data.menu_items[i].description;
      
      if (desc !== undefined &&  desc.toLowerCase().indexOf(list.searchTerm.toLowerCase()) !== -1) {
        
        ChineseMenuService.addItem(response.data.menu_items[i]);
        }
      }
    list.menuItems = ChineseMenuService.getItems();
  }

  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  };

  list.removeItem = function (itemIndex) {
    ChineseMenuService.removeItem(itemIndex);
  };
}


ChineseMenuService.$inject = ['$http', 'ApiBasePath'];
function ChineseMenuService($http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var menuItems = [];

 service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.addItem = function (item) {
    menuItems.push(item);
    //console.log(item)
  };


  service.removeItem = function (itemIndex) {
    menuItems.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return menuItems;
  };

  service.clearItems = function () {
     menuItems = [];
  };
}

})();
