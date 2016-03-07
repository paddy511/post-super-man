/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ['$stateProvider',  function ($stateProvider) {

    $stateProvider
        .state('index.portal', {
            url: "/portal",
            templateUrl: "src/portal/menu/menu.html",
            controller: "menuCtrl",
            abstract: true
        })

        .state('index.portal.httpRequest', {
            url: "/http_request",
            templateUrl: "src/portal/http_request/http_request.html",
            controller: "httpRequestCtrl"
        });
}];