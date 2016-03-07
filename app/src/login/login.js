/**
 * Created by paddy on 2016/2/29.
 */
let angular = require('angular');
let uiRouter = require("angular-ui-router");

let loginCtrl = require('./login.controller');
let loginRouter = require('./login.router');
let loginUserInfoService = require('./loginUserInfo.service');

module.exports = angular.module("loginModule", [uiRouter])

    .config(loginRouter)

    .controller("loginCtrl", loginCtrl)

    .service("loginUserInfoService", loginUserInfoService)

    .run(["loginUserInfoService", (loginUserInfoService) => {
        loginUserInfoService.getUserInfo();
    }])
;
