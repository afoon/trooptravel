angular.module('troopApp').controller('mainCtrl',function($scope, userService){
    // $scope.test = `Issa Test`;
    $scope.getUser= function(){
    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;}
        )
   }
    $scope.getUser();
    $scope.trips = userService.getUserTrips().then( function(response){
            $scope.trips = response.data;
        console.log('trip',$scope.trips)
    }) 
    $scope.createTrip = function(authid,location, startdate, enddate){
        userService.createTrip($scope.user[0].authid,location,startdate,enddate);
     }
})