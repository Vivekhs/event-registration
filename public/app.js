var eventApp = angular.module('eventApp', ['ui.router','ngMaterial','ngAnimate','ngSanitize','ngMessages','ngMdIcons','gridshore.c3js.chart','lfNgMdFileInput']);


eventApp.controller('eventCtrl', ['$rootScope', '$scope', '$http', '$state', '$mdDialog', function($rootScope, $scope, $http, $state, $mdDialog){
  $scope.login =true;
  $rootScope.user={};
  $scope.userName=null;
  $scope.firstName=null;
  $scope.lastName=null;
  $scope.password=null;
  $scope.registrationMsg=null;
  $scope.regSuccessMsg = null;
  $rootScope.userData = {};
    
  $scope.files =null;
    
  $scope.regDetails = {
    fullName : null,
    mobile : null,
    email : null,
    idUrl : null,
    type : null,
    tickets : 1
}

    /** 
    *   Method will register a new user as admin
    */
    $scope.signup = function(){

        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            $scope.registrationMsg="Registration success...";
        }).error(function(response){
            console.log(response);

        });
    }

    /** 
    *   Method will do the login authentication for admin
    */
    $scope.signin = function(){

      $http.post('/signin', $scope.user).success(function(response){

        console.log(response);
          if(response.data){
            $scope.user.displayName = response.data;
            window.localStorage['user-data'] = JSON.stringify($scope.user);
            $state.go('home');
            return;
          }
          console.log(response);
      }).error(function(response){
          console.log(response);

      });
    }

      
    $scope.register = function(){
        
         var formData = new FormData();
            angular.forEach($scope.files,function(obj){
                if(!obj.isRemote){
                    formData.append('files[]', obj.lfFile);
                }
            });
        
            $http.post('/upload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(result){
                $scope.regDetails.idUrl = result.data; 
                $http.post('/register', $scope.regDetails).success(function(response){
        
                    if(response.error){
                        $scope.regSuccessMsg = response.error;
                    }
                    else{
                        $scope.regSuccessMsg = response.data;
                    }
              });
            },function(err){
               console.log(err);
            });
        
        
    }
    
    $scope.previewDetails = function(ev) {
    $mdDialog.show({
      controller : previewCtrl,
      templateUrl: '/components/registration/preview.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: { regDetails: $scope.regDetails }
    });
  };
    
    
    function previewCtrl($scope, $mdDialog, regDetails) {
    $scope.regDetails = regDetails;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }

}]);

eventApp.config(['$locationProvider', function($locationProvider){
              $locationProvider.html5Mode(true);
}]);
