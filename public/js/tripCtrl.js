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
      });
    }
    function getRules(tripid) {
        userService.getRules($stateParams.id).then(function(response) {
          $scope.rules = response.data;
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
        userService.getActivities($stateParams.id).then(function(response) {
          $scope.activities = response.data;
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
          getTransitRiders();
        });
    };


    $scope.createActivity = function(
        authid,tripid,
        name,location,price,link,description,time
    ) {
      userService
        .createActivity(
            authid,tripid,
            name,location,price,link,description,time
        )
        .then(function(response) {
          getActivities();
        });
    };

    $scope.createRule = function(
        authid,tripid,rule
    ) {
      userService
        .createRule(
            authid,tripid,rule
        )
        .then(function(response) {
          getRules();
        });
    };


    $scope.addTripGuest = function(tripid, authid) {
      userService.addTripGuest(tripid, authid).then(function(response) {
        getTripGuest();
      });
    };

    $scope.addTransitRider = function(tripid, authid, transportid) {
      console.log("Trip Ctrl transit", tripid, authid, transportid);
      userService.addTransitRider(tripid, authid, transportid).then(function(response) {
        getTransitRiders();
      });
    };

    $scope.addActivityGuest = function(tripid, authid, activityid) {
      console.log("Trip Ctrl activity", tripid, authid, activityid);
      userService.addActivityGuest(tripid, authid, activityid).then(function(response) {
        getActivityUser();
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
      userService.removeTripUser(id).then(function(response) {
        return response;
      });
      getTripGuest();
    };
    $scope.removeRule = function(id) {
      console.log("TripCtrl rule", id);
      userService.removeRule(id).then(function(response) {
        return response;
      });
      getRules();
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
