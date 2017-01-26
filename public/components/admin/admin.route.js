eventApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

 $urlRouterProvider.when('/home','/home/table');
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: '/components/admin/admin.html',
            controller : 'adminCtrl',
            resolve : {
                registrations: function($http){
                return $http.get('/getAllRegistrations').success(function(response){
                    if(response.error){
                        return [];
                    }
                    console.log(response.data);
                    return response.data;
            })
            }
            }
            
        })
        .state('home.chart', {
            url: '/chart',
            templateUrl: '/components/admin/chart.html',
            controller : 'adminCtrl'
        })

        .state('home.table', {
          url: '/table',
          templateUrl: '/components/admin/table.html',
          controller : 'adminCtrl',
            resolve : {
                registrations: function($http){
                return $http.get('/getAllRegistrations').success(function(response){
                    if(response.error){
                        return [];
                    }
                    console.log(response.data);
                    return response.data;
            })
            }
            }
        })

}]);