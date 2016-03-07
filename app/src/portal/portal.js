/**
 * Created by paddy on 2016/2/29.
 */
let angular = require('angular');
let uiRouter = require("angular-ui-router");

let portalRouter = require("./portal.router");

let menuCtrl = require("./menu/menu.controller");
let httpRequestCtrl = require("./http_request/httpRequest.controller");
let contentTypeValueConst = require("./http_request/contentTypeValue.constant");
let httpRequestService = require("./http_request/httpRequest.service");
let resDataFormatorDirective = require("./http_request/resDataFormator.directive");
let postDataFormatorDirective = require("./http_request/postDataFormator.directive");

module.exports = angular.module("portalModule", [
        uiRouter
    ])

    .config(portalRouter)

    .controller("menuCtrl", menuCtrl)

    .controller("httpRequestCtrl", httpRequestCtrl)
    .constant("CONTENT_TYPE_VALUE", contentTypeValueConst)
    .service("httpRequestService", httpRequestService)
    .directive("resDataFormator", resDataFormatorDirective)
    .directive("postDataFormator", postDataFormatorDirective)
;