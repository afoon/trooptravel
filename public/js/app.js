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
                resolve: {
                    main: (userService, $state) => userService.getUser()
                        .then(response => response.data)
                        .catch(err => $state.go('login'))
                },
            })
            .state('trip', {
                url: '/trip/:id',
                templateUrl: 'views/trip.html',
                controller: 'tripCtrl',
                resolve: {
                    trip: (userService, $state) => userService.getUser()
                        .then(response => response.data)
                        .catch(err => $state.go('login'))
                },
        
            })
            .state('housing', {
                url: '/housing/:id',
                templateUrl: 'views/housing.html',
                controller: 'tripCtrl',
                resolve: {
                    housing: (userService, $state) => userService.getUser()
                        .then(response => response.data)
                        .catch(err => $state.go('login'))
                },
                
            });
            
        $urlRouterProvider
            .otherwise('/');
    })
  
