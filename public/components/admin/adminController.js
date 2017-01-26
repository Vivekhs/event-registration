eventApp.controller('adminCtrl', ['registrations','$rootScope', '$scope', '$http', '$state','$mdDialog', function(registrations, $rootScope, $scope, $http, $state, $mdDialog){
    
    $scope.registrations = registrations.data.data;
    console.log('localss',$scope.registrations);
    $scope.user = JSON.parse(window.localStorage['user-data']);
    $scope.logout = function(){
    $http.get('/logout').success(function(response){
        console.log("Hello dude", response);
        if(response.data){
         window.localStorage.removeItem('user-data');
          $state.go('registration');
        }
      });
    }
    
    $scope.chartData ={
        self:0,
        corporate:0,
        group:0,
        others:0
    }
    
    $scope.registrations.filter(function(data){
        
        if(data.type == 'Self'){
            $scope.chartData.self++;
        }
        if(data.type == 'Corporate'){
            $scope.chartData.corporate++;
        }
        if(data.type == 'Group'){
            $scope.chartData.group++;
        }
        if(data.type == 'Others'){
            $scope.chartData.others++;
        }
        
    });
    
    $scope.previewRegDetails = function(ev, regDetails) {
    $mdDialog.show({
      controller : previewRegCtrl,
      templateUrl: '/components/admin/registrationDetails.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: { regDetails: regDetails }
    });
  };
    
    
    function previewRegCtrl($scope, $mdDialog, regDetails) {
    $scope.regDetails = regDetails;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
    
  
}]);

