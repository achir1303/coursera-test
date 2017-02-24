(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$q','$http', 'ApiBasePath']
function MenuDataService($q,$http, ApiBasePath) {
  var service = this;

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {

var deferred = $q.defer();

    // Wait 2 seconds before returning
    deferred.resolve(
        $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
          })
        )

    return deferred.promise;

  };

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
  deferred.resolve(
        $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: {
            category: categoryShortName
            }
          })
        )

    return deferred.promise;
  };


}

})();
