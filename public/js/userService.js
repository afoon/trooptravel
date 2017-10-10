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
});