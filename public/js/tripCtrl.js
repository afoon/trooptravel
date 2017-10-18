angular.module('troopApp').controller('tripCtrl',function($scope, $timeout, userService,$stateParams){
    // $scope.test = `Issa Test`;
    $scope.getUser= function(){
    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;
 
    })}
    $scope.getFriends= function(){
        $scope.friends = userService.getFriends().then( function (response) {
                $scope.friends = response.data;
     
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
            $scope.housing = response.data;

    })
    $scope.createHousing = function(location, price,link,photourl){
        userService.createHousing($stateParams.id,$scope.user[0].authid,location,price,link,photourl,$scope.user[0].user_name).then(
            function(response){
           getHousing()
        }
        )}
    }
$scope.upvote= function (id,upvote){
    var newVote = upvote + 1;
    userService.upvote(id,newVote).then(
        function(response){
       getHousing()
        })
}

$scope.downvote= function (id,downvote){
    var newVote = downvote + 1;
    userService.downvote(id,newVote).then(
        function(response){
       getHousing()
        })
}

$scope.updateTrip= function (tripid,location,start,end){
    userService.updateTrip(tripid,location,start,end).then(
        function(response){
        })
}

$scope.updateHousing= function (id,location,price, link,photourl){
    console.log('update:',id,location,price, link,photourl)
    userService.updateHousing(id,location,price, link,photourl).then(
        function(response){
        })
}

$scope.deleteTrip = function (tripid){
    userService.deleteTrip(tripid).then(
        function (response){
            return response;
        })
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