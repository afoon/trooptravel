angular.module('troopApp').controller('mainCtrl',function($scope,userService){
    // $scope.test = `Issa Test`;
        userService.getUser().then( function (response) {
            $scope.user = response.data.filter(user => user.name);
            console.log('info',$scope.user)}
        )

})