angular.module("troopApp").service("userService", function($http) {
  this.getFriends = function() {
    return $http.get("/api/users").then(function(response) {
      return response;
    });
  };
  this.getUser = function() {
    return $http.get("/api/user").then(function(response) {
      return response;
    });
  };
  this.createTrip = function(authid, location, start, end) {
    return $http
      .post("/api/trips", { authid, location, start, end })
      .then(function(response) {
        return response;
      });
  };
  this.getUserTrips = function() {
    return $http.get("/api/utrips").then(function(response) {
      return response;
    });
  };
  this.getCurrTrip = function(tripid) {
    return $http.get(`/api/currtrip/${tripid}`).then(function(response) {
      return response;
    });
  };
  this.getTripGuest = function(tripid) {
    return $http.get(`/api/tripguest/${tripid}`).then(function(response) {
      return response;
    });
  };
  this.addTripGuest = function(tripid, authid) {
    return $http
      .post(`/api/trips/${tripid}`, { authid })
      .then(function(response) {
        return response;
      });
  };

  this.createRule = function(tripid, authid,rule) {
    console.log("Service", tripid, authid, rule);
    return $http
      .post(`/api/rules/`, { authid, tripid, rule })
      .then(function(response) {
        return response;
      });
  };

  this.getHousing = function(tripid) {
    return $http.get(`/api/housing/${tripid}`).then(function(response) {
      return response;
    });
  };

  this.getTransportation = function(tripid) {
    return $http.get(`/api/transport/${tripid}`).then(function(response) {
      return response;
    });
  };

  this.getActivities = function(tripid) {
    return $http.get(`/api/activities/${tripid}`).then(function(response) {
      return response;
    });
  };

  this.getRules = function(tripid) {
      console.log('getting rules in service');
    return $http.get(`/api/rules/${tripid}`).then(function(response) {
      return response;
    });
  };

  this.getTransitRiders = function(tripid) {
  return $http.get(`/api/utransport/${tripid}`).then(function(response) {
    return response;
  });
};

  this.createHousing = function(
    tripid,
    authid,
    location,
    price,
    link,
    photourl,
    submittedby
  ) {
    return $http
      .post("/api/housing", {
        tripid,
        authid,
        location,
        price,
        link,
        photourl,
        submittedby
      })
      .then(function(response) {
        return response;
      });
  };
  this.createActivity = function(
    authid,tripid,
    name,location,price,link,description,time
  ) {
    return $http
      .post("/api/activity", {
        authid,tripid,
        name,location,price,link,description,time
      })
      .then(function(response) {
        return response;
      });
  };

  this.createTransportation = function(
    tripid,
    type,
    departurelocation,
    departuretime,
    arrivallocation,
    arrivaltime
  ) {
      console.log('create Service')
    return $http
      .post("/api/transport/", {
        tripid,
        type,
        departurelocation,
        departuretime,
        arrivallocation,
        arrivaltime
      })
      .then(function(response) {
        return response;
      });
  };
  this.upvote = function(id, upvote) {
    return $http
      .put(`/api/upvote/${id}`, { id, upvote })
      .then(function(response) {
        return response;
      });
  };
  this.downvote = function(id, downvote) {
    return $http
      .put(`/api/downvote/${id}`, { id, downvote })
      .then(function(response) {
        return response;
      });
  };
  this.updateTrip = function(tripid, location, start, end) {
    return $http
      .put(`/api/trips/${tripid}`, { tripid, location, start, end })
      .then(function(response) {
        return response;
      });
  };
  this.deleteTrip = function(tripid) {
    return $http.delete(`/api/trips/${tripid}`).then(function(response) {
      return response;
    });
  };
  this.removeTripUser = function(id) {
    console.log("Srv", id);
    return $http.delete(`/api/guest/${id}`).then(function(response) {
      return response;
    });
  };
  this.updateHousing = function(id, location, price, link, photourl) {
    return $http
      .put(`/api/housing/${id}`, { id, location, price, link, photourl })
      .then(function(response) {
        return response;
      });
  };
});
