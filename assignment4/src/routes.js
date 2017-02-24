(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/category-list',
    templateUrl: 'src/menuapp/templates/main-categorieslist.template.html',
    controller: 'MainCategoriesListController as mainList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        //console.log("deferred")
         return  MenuDataService.getAllCategories();

      }]
    }
  })

  .state('menuList', {
    url: '/category-list/{categoryname}',
    templateUrl: 'src/menuapp/templates/menuitem.template.html',
    controller: 'MenuItemsController as menuList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.category)
              .then(function (response) {
                //console.log(response.data)
                  return response.data;
                });
            }]
    }
  });
}

})();
