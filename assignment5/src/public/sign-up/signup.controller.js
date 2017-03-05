(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject = ['$state','$filter','ApiPath', 'MenuService'];
function SignUpController($state,$filter,ApiPath, MenuService) {
  var $ctrl = this;
  var upCase = $filter('uppercase');

   $ctrl.doSignUp =  function() {
		//get the menu item from shortname
		//console.log($ctrl.shortname)
		var menuItem = MenuService.getMenuItem(upCase($ctrl.shortname)).then(function (menuItem) {
      		//$ctrl.menuItem = menuItem;
      		console.log(menuItem)
      		MenuService.addCustomer($ctrl.firstname,$ctrl.lastname,$ctrl.phone,$ctrl.email,menuItem.short_name);
      		$ctrl.message = "Your information has been saved";
    	}, function(response) {
      		// failed
      		$ctrl.message = "No such menu number exists";
    	});

	};

	$ctrl.cancel =  function() {
		$state.go('public.home')
	};

}

})();
