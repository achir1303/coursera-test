(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['$state','ApiPath', 'MenuService'];
function MyInfoController($state,ApiPath, MenuService) {
  var $ctrl = this;
  $ctrl.customer = MenuService.getCustomer();

  if($ctrl.customer) {
    $ctrl.signUp = false;
    $ctrl.basePath = ApiPath;
     var item = MenuService.getMenuItem($ctrl.customer.menuNum).then(function (item) {
          $ctrl.menuItem = item
          console.log($ctrl.menuItem)

          
      }, function(response) {
          // failed
          $ctrl.error = "Unable to retrieve your favourtie menu item";
      });

  } else {
    $ctrl.signUp = true;
  }

  


  

}

})();
