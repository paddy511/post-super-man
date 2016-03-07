/**
 * Created by paddy on 2016/3/3.
 */
module.exports = [ function(){

    return {
        restrict: "EA",
        scope: {
            resData: "="
        },
        template: "<pre ng-show='!isJson'>{{resData}}</pre>" +
                  "<div ng-show='isJson'>" +
                    "<json-formator json-data='resData'></json-formator>" +
                  "</div>",
        link: function(scope){

            //========== scope ===========
            scope.isJson = false;

            let checkDataType = function() {
                try {
                    JSON.parse(scope.resData);
                    scope.isJson = true;
                }catch (err){
                    scope.isJson = false;
                    console.log(err);
                    console.log("the response data is not a json!")
                }
            };

            scope.$watch("resData", () => {
                checkDataType();
            });
        }
    }
}];