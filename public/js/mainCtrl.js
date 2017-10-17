angular.module('troopApp').controller('mainCtrl',function($scope, userService,$stateParams){
    // $scope.test = `Issa Test`;
    $scope.getUser= function(){
    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;
 
    }
            
        )
   }
    $scope.getUser();


   function getUserTrips() {
       userService.getUserTrips().then(function(response){
           $scope.trips = response.data;
       })
   }
   getUserTrips();

    $scope.createTrip = function(authid,location, startdate, enddate){
        userService.createTrip($scope.user[0].authid,location,startdate,enddate).then(
            function(response){
           getUserTrips()
        }
    )}
})