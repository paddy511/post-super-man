/**
 * Created by paddy on 2016/3/4.
 */
let $ = require('jquery');
module.exports = ["$compile", function($compile){

    return {
        restrict: "EA",
        scope: {
            jsonData: "="
        },
        template: "<div></div>",
        link: function(scope, ele){
            //========== json data handler ========
            let processJson = function(json) {
                return generateHtml(json);
            };

            let generateHtml = function(json){
                if(json instanceof Object){
                    return getObjectHtml(json, 1);
                }else if(json instanceof Array){
                    return getArrayHtml(json, 1);
                }
            };

            let getObjectHtml = function(obj, currentLoop){
                let i = 1;
                let count = Object.keys(obj).length;
                let _arrHtml = [];
                let bindName = "isExpand" + assendNum;
                let space = "";
                assendNum++;

                for(let j = 0; j < currentLoop - 1; j++){
                    space += "\t"
                }

                _arrHtml.push("<span ng-init='" + bindName + "= true'>{ <i class='cup' ng-click='" + bindName + "= !" + bindName + "' ng-class='{true:\"glyphicon glyphicon-minus\", false:\"glyphicon glyphicon-plus\"}[" + bindName + "]'></i><span ng-show='" + bindName + "'>");
                for(let key in obj){

                    if(obj[key] instanceof Array){
                        if(count === i){
                            _arrHtml.push( "<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : " + getArrayHtml(obj[key], currentLoop + 1) + "</div>");
                        }else {
                            _arrHtml.push( "<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : " + getArrayHtml(obj[key], currentLoop + 1) + ",</div>");
                        }
                    }else if(obj[key] instanceof Object){
                        if(count === i){
                            _arrHtml.push( "<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : " + getObjectHtml(obj[key], currentLoop + 1) + "</div>");
                        }else {
                            _arrHtml.push( "<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : " + getObjectHtml(obj[key], currentLoop + 1) + ",</div>");
                        }
                    }else if(typeof obj[key] === "number"){
                        if(count === i){
                            _arrHtml.push("<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : <span class='text-danger'>" + obj[key] + "</span></div>");
                        }else {
                            _arrHtml.push("<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : <span class='text-danger'>" + obj[key] + "</span>,</div>");
                        }
                    }else {
                        if(count === i){
                            _arrHtml.push("<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : <span class='text-success'>" + "\"" + obj[key] + "\"" + "</span></div>");
                        }else {
                            _arrHtml.push("<div><span class='text-primary'>\t" + space + "\"" + key + "\"" + "</span> : <span class='text-success'>" + "\"" + obj[key] + "\"" + "</span>,</div>");
                        }
                    }
                    i++;
                }
                _arrHtml.push("</span><span ng-hide='" + bindName + "'>...</span><span ng-show='" + bindName + "'>" + space + "</span>}</span>");
                return _arrHtml.join("");
            };

            let getArrayHtml = function(arr, currentLoop){
                let _arrHtml = [];
                let bindName = "isExpand" + assendNum;
                let space = "";
                assendNum++;
                for(let j = 0; j < currentLoop - 1; j++){
                    space += "\t"
                }
                _arrHtml.push("<span ng-init='" + bindName + "= true'>[ <i class='cup' ng-click='" + bindName + "= !" + bindName + "' ng-class='{true:\"glyphicon glyphicon-minus\", false:\"glyphicon glyphicon-plus\"}[" + bindName + "]'></i><span ng-show='" + bindName + "'>");
                for(let k = 0; k < arr.length ;k++){

                    if(arr[k] instanceof Array){
                        if( k === arr.length - 1){
                            _arrHtml.push( "<div>\t" + space + getArrayHtml(arr[k], currentLoop + 1) + "</div>");
                        }else{
                            _arrHtml.push( "<div>\t" + space + getArrayHtml(arr[k], currentLoop + 1) + ",</div>");
                        }

                    }else if(arr[k] instanceof Object){
                        if( k === arr.length - 1){
                            _arrHtml.push( "<div>\t" + space + getObjectHtml(arr[k], currentLoop + 1) + "</div>");
                        }else{
                            _arrHtml.push( "<div>\t" + space + getObjectHtml(arr[k], currentLoop + 1) + ",</div>");
                        }
                    }else if(typeof arr[k] === "number"){
                        if(k === arr.length - 1){
                            _arrHtml.push("<div>\t" + space + "<span class='text-danger'>" + arr[k] + "</span></div>");
                        }else {
                            _arrHtml.push("<div>\t" + space + "<span class='text-danger'>" + arr[k] + "</span>,</div>");
                        }
                    }else {
                        if(k === arr.length - 1){
                            _arrHtml.push("<div>\t" + space + "<span class='text-success'>" + "\"" + arr[k] + "\"" + "</span></div>");
                        }else {
                            _arrHtml.push("<div>\t" + space + "<span class='text-success'>" + "\"" + arr[k] + "\"" + "</span>,</div>");
                        }
                    }
                }
                _arrHtml.push("</span><span ng-hide='" + bindName + "'>...</span><span ng-show='" + bindName + "'>" + space + "</span>]</span>");
                return _arrHtml.join("");
            };

            //========== scope ===========
            let assendNum = new Date().getTime();
            let jsonHtml = "";

            let checkDataType = function() {
                try {
                    let _jsonData = JSON.parse(scope.jsonData);
                    jsonHtml = "<pre>" + processJson(_jsonData) + "</pre>";
                    let _templateView = $compile(jsonHtml)(scope);
                    $(ele[0]).html(_templateView);
                }catch (err){
                    console.log("the data is not a json!")
                }
            };

            scope.$watch("jsonData", () => {
                checkDataType();
            });
        }
    }
}];