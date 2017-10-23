angular
  .module("troopApp")
  .controller("tripCtrl", function(
    $scope,
    $timeout,
    userService,
    $stateParams
  ) {
    // $scope.test = `Issa Test`;
    $scope.getUser = function() {
      $scope.user = userService.getUser().then(function(response) {
        $scope.user = response.data;
      });
    };
    $scope.getFriends = function() {
      getTripGuest().then(function(response) {
        $scope.friends = userService.getFriends().then(function(response) {
          $scope.friends = response.data.filter(friend => {
            var tempGuest = $scope.tripguest.find(
              guest => guest.authid == friend.friend
            );
            return tempGuest ? false : true;
          });
        });
      });
    };

    function getCurrTrip(tripid) {
      userService.getCurrTrip($stateParams.id).then(function(response) {
        $scope.currtrip = response.data;
      });
    }
    function getActivityUser(tripid) {
      userService.getActivityUser($stateParams.id).then(function(response) {
        $scope.activityguest= response.data;
        console.log($scope.activityguest);
      });
    }
    function getRules(tripid) {
        userService.getRules($stateParams.id).then(function(response) {
          $scope.rules = response.data;
          console.log('rules',$scope.rules);
        });
      }
    function getTripGuest(tripid) {
      return userService.getTripGuest($stateParams.id).then(function(response) {
        $scope.tripguest = response.data;
      });
    }
    function getHousing(tripid) {
      userService.getHousing($stateParams.id).then(function(response) {
        $scope.housing = response.data;
      });
    }
    function getTransportation(tripid) {
      userService.getTransportation($stateParams.id).then(function(response) {
        $scope.transportation = response.data;
      });
    }
    function getTransitRiders(tripid) {
        userService.getTransitRiders($stateParams.id).then(function(response) {
          $scope.riders = response.data;
        });
      }
    function getActivities(tripid) {
      console.log($stateParams.id)
        userService.getActivities($stateParams.id).then(function(response) {
          $scope.activities = response.data;
          console.log('activity',$scope.activities)
        });
      }

    $scope.createHousing = function(location, price, link, photourl) {
      userService
        .createHousing(
          $stateParams.id,
          $scope.user[0].authid,
          location,
          price,
          link,
          photourl,
          $scope.user[0].user_name
        )
        .then(function(response) {
          getHousing();
        });
    };

    $scope.createTransportation = function(
        tripid,
      type,
      departurelocation,
      departuretime,
      arrivallocation,
      arrivaltime
    ) {
        console.log('trip Ctrl')
      userService
        .createTransportation(
          tripid,
          type,
          departurelocation,
          departuretime,
          arrivallocation,
          arrivaltime
        )
        .then(function(response) {
          getTransportation();
        });
    };


    $scope.createActivity = function(
        authid,tripid,
        name,location,price,link,description,time
    ) {
        console.log('trip Ctrl activity')
      userService
        .createActivity(
            authid,tripid,
            name,location,price,link,description,time
        )
        .then(function(response) {
          getActivity();
        });
    };

    $scope.createRule = function(
        authid,tripid,rule
    ) {
        console.log('trip Ctrl rule')
      userService
        .createRule(
            authid,tripid,rule
        )
        .then(function(response) {
          getRules();
        });
    };


    $scope.addTripGuest = function(tripid, authid) {
      console.log("Trip Ctrl", tripid, authid);
      userService.addTripGuest(tripid, authid).then(function(response) {
        getTripGuest();
      });
    };

    $scope.upvote = function(id, upvote) {
      var newVote = upvote + 1;
      userService.upvote(id, newVote).then(function(response) {
        getHousing();
      });
    };

    $scope.downvote = function(id, downvote) {
      var newVote = downvote + 1;
      userService.downvote(id, newVote).then(function(response) {
        getHousing();
      });
    };

    $scope.updateTrip = function(tripid, location, start, end) {
      userService
        .updateTrip(tripid, location, start, end)
        .then(function(response) {});
      $(".editTripModal").modal("hide");
    };

    $scope.updateHousing = function(id, location, price, link, photourl) {
      console.log("update:", id, location, price, link, photourl);
      userService
        .updateHousing(id, location, price, link, photourl)
        .then(function(response) {
          $(".edithousing").modal("hide");
        });
    };

    $scope.deleteTrip = function(tripid) {
      userService.deleteTrip(tripid).then(function(response) {
        return response;
      });
      $("#modalConfirmDelete").modal("hide");
      $(".editTripModal").modal("hide");
    };
    $scope.removeTripUser = function(id) {
      console.log("TripCtrl", id);
      userService.removeTripUser(id).then(function(response) {
        return response;
      });
      getTripGuest();
    };

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
    getTransportation();
    getTransitRiders();
    getRules();
    getActivities();
    getActivityUser();
    // $scope.addTripGuest();
  });
