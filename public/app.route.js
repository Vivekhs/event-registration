
eventApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

 $urlRouterProvider.otherwise("/");
    $stateProvider
        
        .state('registration', {
            url: '/',
            templateUrl: '/components/registration/registration.html',
            controller : 'eventCtrl'
            
        })
        .state('sign_in', {
            url: '/sign_in',
            templateUrl: '/components/login/signin.html',
            controller : 'eventCtrl'
        })

        .state('sign_up', {
          url: '/sign_up',
          templateUrl: '/components/login/signup.html',
          controller : 'eventCtrl'
        })

}]);
