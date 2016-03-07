/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main/portal/http_request");

    $stateProvider
        .state('index', {
            url: "/main",
            templateUrl: "src/main/main.html",
            controller: "mainCtrl",
            abstract: true
        });
}];