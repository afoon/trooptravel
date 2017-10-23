angular.module('troopApp',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: '/views/landing.html',
                
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about.html',
                
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
            .state('transport', {
                url: '/transport/:id',
                templateUrl: 'views/transport.html',
                controller: 'tripCtrl',
                resolve: {
                    transport: (userService, $state) => userService.getUser()
                        .then(response => response.data)
                        .catch(err => $state.go('login'))
                },
        
            })
            .state('activities', {
                url: '/activities/:id',
                templateUrl: 'views/activities.html',
                controller: 'tripCtrl',
                resolve: {
                    activities: (userService, $state) => userService.getUser()
                        .then(response => response.data)
                        .catch(err => $state.go('login'))
                },
        
            })
            .state('rules', {
                url: '/rules/:id',
                templateUrl: 'views/guidelines.html',
                controller: 'tripCtrl',
                resolve: {
                    rules: (userService, $state) => userService.getUser()
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
  
