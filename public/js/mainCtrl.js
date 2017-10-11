angular.module('troopApp').controller('mainCtrl',function($scope, userService){
    // $scope.test = `Issa Test`;

    $scope.user = userService.getUser().then( function (response) {
            $scope.user = response.data;
            console.log('info',$scope.user)}
        )

})