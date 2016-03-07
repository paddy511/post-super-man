/**
 * Created by paddy on 2016/3/4.
 */
module.exports = ["CONTENT_TYPE_VALUE", function(CONTENT_TYPE_VALUE){


    return {
        restrict: "EA",
        scope: {
            postData: "=",
            contentType: "="
        },
        template: "<div ng-show='contentType === CONTENT_TYPE_VALUE.JSON'>" +
                    "<json-formator json-data='postData'></json-formator>" +
                  "</div>" +
                  "<div ng-show='contentType === CONTENT_TYPE_VALUE.X_WWW_FORM_URLENCODED'>" +
                        "<table class='table table-bordered'>" +
                            "<tr><td colspan='2'><h4><strong>Form Data</strong></h4></td></tr>" +
                            "<tr class='active '><td><em>key</em></td><td><em>value</em></td></tr>" +
                            "<tr ng-repeat='(key, value) in WWW_FormData'>" +
                              "<td class='text-primary'>{{key}}</td><td class='text-success'>{{value}}</td>" +
                            "</tr>" +
                        "</table>" +
                  "</div>",
        link: function(scope){
            scope.CONTENT_TYPE_VALUE = CONTENT_TYPE_VALUE;
            scope.WWW_FormData = {};

            //change the www-form-data to object
            let parseWWWFormData = function(_formData){
                let _queryObj = {};
                if(scope.contentType !== CONTENT_TYPE_VALUE.X_WWW_FORM_URLENCODED || !_formData){
                    return _queryObj;
                }
                let _arrQuery = _formData.split("&");
                for(let _query of _arrQuery){
                    let _qArr = _query.split("=");
                    _queryObj[_qArr[0]] = _qArr[1];
                }
                return _queryObj;
            };

            scope.$watch("postData", ()=>{
                scope.WWW_FormData = parseWWWFormData(scope.postData);
            });

        }
    }
}];