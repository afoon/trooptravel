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

    this.getUser = function(){
        return $http.get('/api/users').then(function(response){
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
    })
}
});