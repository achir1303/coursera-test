(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  
  $scope.displayMessage = function () {
    //clear the message
    $scope.message = ""

    if ($scope.items == null || $scope.items == "") {
      $scope.message = "Please enter data first"
    }

    else {
      var itemArray = $scope.items.split(',');

      if( itemArray.length <= 3) 
          $scope.message = "Enjoy!"
        else 
          $scope.message = "Too much!"
    }

  };
}

})();
