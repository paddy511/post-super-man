/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ["$scope", "loginUserInfoService", "$state",  ($scope, loginUserInfoService, $state) => {

    $scope.accountInfo = {};
    $scope.isError = false;

    $scope.login = function(){
        if(loginUserInfoService.login($scope.accountInfo.username, $scope.accountInfo.password)){
            $scope.isError = false;
            $state.go("index.portal.httpRequest");
        }else {
            $scope.isError = true;
        }
    }

}];