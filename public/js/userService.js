angular.module('troopApp').service('userService',function($http)
{
//     this.getUser= function(){
//         var promise = $http({
//             method:'GET', 
//             url:'/api/users'
//         });
// return promise;
// console.log(promise);
//     }

this.getFriends = function(){
    return $http.get('/api/users').then(function(response){
        return response;
    })
}
    this.getUser = function(){
        return $http.get('/api/user').then(function(response){
            return response;
        })
    }
    this.createTrip = function(authid, location, start ,end){
        return $http.post('/api/trips', {authid, location, start ,end}).then(function(response){
            return response;
        })
    }
    this.getUserTrips = function() {
        return $http.get('/api/utrips').then(function(response){
        return response;
    });
}
    this.getCurrTrip = function(tripid){
        return $http.get(`/api/currtrip/${tripid}`).then(function(response){
            return response;
        })
    }
    this.getTripGuest = function(tripid){
        return $http.get(`/api/tripguest/${tripid}`).then(function(response){
            return response;
        })
    }
    this.addTripGuest = function(tripid,friend){
        return $http.post(`/api/trips/${tripid}`, {friend}).then(function(response){
            return response;
        })
    }
    this.getHousing = function(tripid){
        return $http.get(`/api/housing/${tripid}`).then(function(response){
            return response;
        })
    }
    this.createHousing = function(tripid,authid,location,price, link,photourl,submittedby){
        console.log('service',submittedby)
        return $http.post('/api/housing', {tripid,authid, location, price, link,photourl,submittedby}).then(function(response){
            return response;
        })
    }
});