/**
 * Created by paddy on 2016/3/4.
 */
let angular = require('angular');

let jsonFormatorDirective = require('./directive/jsonFormator.directive');

module.exports = angular.module("componentModule", [ ])

    .directive("jsonFormator", jsonFormatorDirective)

;