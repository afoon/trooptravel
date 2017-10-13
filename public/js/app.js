angular.module('troopApp',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: '/views/landing.html',
                
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'mainCtrl',
            })
            .state('trip', {
                url: '/trip/:id',
                templateUrl: 'views/trip.html',
                // controller: 'mainCtrl'
            })
            .state('housing', {
                url: '/housing/:id',
                templateUrl: 'views/housing.html',
            });
            
        $urlRouterProvider
            .otherwise('/');
    })
  
