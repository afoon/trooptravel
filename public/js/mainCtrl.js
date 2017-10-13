angular.module('troopApp').controller('mainCtrl',function($scope, $timeout, userService,$stateParams){
    // $scope.test = `Issa Test`;
    $scope.getUser= function(){
    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;
 
    }
            
        )
   }
    $scope.getUser();
console.log($stateParams)


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
    function getCurrTrip(tripid) {
        console.log(tripid)
        userService.getCurrTrip(tripid).then(function(response){
            $scope.currtrip = response.data;
        })
    }
    function getTripGuest(tripid) {
        console.log(tripid)
        userService.getTripGuest(tripid).then(function(response){
            console.log('trip guest', response)
            $scope.tripguest = response.data;
        })
    }
    $scope.addTripGuest = function(tripid,friend){
        userService.addTripGuest(trip.id,friend).then(
            function(response){
           getAddTripGuest()
        }
    )}
    $timeout(function(){
        getCurrTrip($stateParams.id)
        getTripGuest($stateParams.id);
        console.log($stateParams.id)
    }, 200)
})