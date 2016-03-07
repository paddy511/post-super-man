/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ['$stateProvider',  function ($stateProvider) {

    $stateProvider
        .state('index.login', {
            url: "/login",
            templateUrl: "src/login/login.html",
            controller: "loginCtrl"
        });
}];