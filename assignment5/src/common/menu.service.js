(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var customer = null;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
   var path = ApiPath + '/menu_items/' + shortName + '.json'
  //console.log(path)

    return $http.get(path).then(function (response) {
      //console.log(response.data)
      return response.data;
    });
  };

  service.addCustomer = function(custFN,custLN,custPhone,custEmail,custMenuNum) {
      customer = {
        firstname: custFN,
        lastname: custLN,
        phone: custPhone,
        email: custEmail,
        menuNum: custMenuNum
      };

      console.log(customer)

  };

  service.getCustomer = function() {
    return customer;
  };

}



})();
