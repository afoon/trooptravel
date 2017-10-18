angular.module('troopApp').controller('tripCtrl',function($scope, $timeout, userService,$stateParams){
    // $scope.test = `Issa Test`;
    $scope.getUser= function(){
    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;
 
    })}
    $scope.getFriends= function(){
        $scope.friends = userService.getFriends().then( function (response) {
                $scope.friends = response.data;
                console.log('peeps',$scope.friends)
     
        })}
   $scope.tripid= $stateParams.id;
    function getCurrTrip(tripid) {
        userService.getCurrTrip($stateParams.id).then(function(response){
            $scope.currtrip = response.data;
        })
    }
    function getTripGuest(tripid) {
        userService.getTripGuest($stateParams.id).then(function(response){
            $scope.tripguest = response.data;
        })
    }
    function getHousing(tripid){
        userService.getHousing($stateParams.id).then(function(response){
            console.log('trip housing', response)
            $scope.housing = response.data;

    })
    $scope.createHousing = function(location, price,link,photourl){
        userService.createHousing($stateParams.id,$scope.user[0].authid,location,price,link,photourl,$scope.user[0].user_name).then(
            function(response){
                console.log('tripCtrl2',response)
           getHousing()
        }
        )}
    }


    // $scope.addTripGuest = function($stateParams.id,friend){
    //     userService.addTripGuest(trip.id,friend).then(
    //         function(response){
    //        getAddTripGuest()
    // )}
    $scope.getUser();
    $scope.getFriends();
    getCurrTrip();
    getTripGuest();
    getHousing();
    // $scope.addTripGuest();
})