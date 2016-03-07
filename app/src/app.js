/**
 * Created by paddy on 2016/2/29.
 */
let angular = require('angular');
let uiRouter = require("angular-ui-router");
let loginModule = require("./login/login");
let portalModule = require("./portal/portal");
let componentModule = require("./components/component");

let mainCtrl = require('./main/main.controller');
let mainRouter = require('./main/main.router');

angular.module("mainModule", [
    uiRouter,
    loginModule.name,
    portalModule.name,
    componentModule.name
])

    .config(mainRouter)

    .config(['$sceProvider', function($sceProvider){
        $sceProvider.enabled(false);
    }])

    .controller("mainCtrl", mainCtrl)

    .service("node_fs", () => {
        return window.node_fs;
    })

    .service("node_http", () => {
        return window.node_http;
    })

    .service("node_querystring", () => {
        return window.node_querystring;
    })

    .service("node_url", () => {
        return window.node_url;
    })

    .service("node_zlib", () => {
        return window.node_zlib;
    })
;


