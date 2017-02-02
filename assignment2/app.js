(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListBuyController', ShoppingListBuyController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  //ShoppingListProvider.defaults.maxItems = 5;
}

ShoppingListBuyController.$inject = ['ShoppingList'];
function ShoppingListBuyController(ShoppingList) {
  var list1 = this;

  list1.items = ShoppingList.getBuyItems();


  list1.tickOffBoughtItem = function (itemIndex) {
    try {
      ShoppingList.addItem(list1.items[itemIndex].name, list1.items[itemIndex].quantity);
      ShoppingList.removeItem(itemIndex);

      if(list1.items.length <= 0 ) {
        list1.message = "Everything is bought!"
      }

    } catch (error) {
      //list.errorMessage = error.message;
    }
  };

  list1.removeItem = function (itemIndex) {
    ShoppingList.removeItem(itemIndex);
  };
}

ShoppingListBoughtController.$inject = ['ShoppingList'];
function ShoppingListBoughtController(ShoppingList) {
  var list2 = this;

  list2.items = ShoppingList.getBoughtItems();

}


// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var service = this;

  // List of shopping items
  var buyItems = [{name:"cookies",quantity:5},{name:"apples",quantity:10},{name:"oranges",quantity:8},{name:"bananas",quantity:6},{name:"cakes",quantity:3}];
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);
   
  };

  service.removeItem = function (itemIndex) {
    buyItems.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}


function ShoppingListProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingList = new ShoppingListService();

    return shoppingList;
  };
}

})();
