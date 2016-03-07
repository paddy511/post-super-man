/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ["$scope", "CONTENT_TYPE_VALUE", "httpRequestService", function($scope, CONTENT_TYPE_VALUE, httpRequestService){

    let url_IsDropDown;

    let checkJsonFormat = function(){
        try {
            JSON.parse($scope.req_info.data.json);
            $scope.isError.json = false;
            return true
        }catch (err){
            console.log(err);
            $scope.isError.json = true;
            return false
        }
    };

    let initRequestInfo = function(){
        $scope.req_info = {
            method: "GET",
            url: "",
            contentType: CONTENT_TYPE_VALUE.X_WWW_FORM_URLENCODED,
            data: {
                XWWWFormData: [],
                json: ""
            },
            headers: {}
        };
        $scope.requestTab = "headers";
    };

    let initInputFormData = function(){
        $scope.input_xxx_form_data = { key: "", value: ""};
    };

    let initInputHeader = function(){
        $scope.input_header = { key: "", value: ""};
    };

    let showResult = function(){
        $scope.isSending = false
        $scope.resultInfo.isShow = true;
    };

    let hideResult = function(){
        $scope.resultInfo.isShow = false;
    };

    let initResult = function(){
        $scope.resultTab = "request_headers";
        $scope.resultInfo = {
            isShow: false
        };
    };

    //=========== $scope method ===========
    $scope.toggleUrlMethodSelect = function(){
        url_IsDropDown = !url_IsDropDown;
    };

    $scope.isShowUrlMethodSelect = function(){
        if(url_IsDropDown){
            return {"display": "inherit"}
        }else {
            return {"display": "none"}
        }
    };

    $scope.hideUrlMethodSelect = function(){
        url_IsDropDown = false;
    };

    $scope.chooseMethod = function(method){
        $scope.requestForm.$setPristine();
        $scope.isError = {};
        initResult();
        initInputFormData();
        initInputHeader();
        initRequestInfo();
        $scope.req_info.method = method;
        url_IsDropDown = false;
    };

    $scope.chooseResultTab = function(_tab){
        $scope.resultTab = _tab;
    };

    $scope.chooseRequestTab = function(_tab){
        $scope.requestTab = _tab;
    };

    $scope.hasBody = function(){
      switch ($scope.req_info.method){
          case "GET":
              return false;
              break;
          case "DELETE":
              return false;
              break;
          default :
              return true
      }
    };

    $scope.addXWWWFormData = function(){
        $scope.req_info.data.XWWWFormData.push({
            key: $scope.input_xxx_form_data.key,
            value: $scope.input_xxx_form_data.value
        });
        initInputFormData();
    };

    $scope.addHeader = function(){
        if(!$scope.input_header.key){
            $scope.isError.isNullHeader = true;
            return;
        }
        $scope.isError.isNullHeader = false;
        $scope.req_info.headers[$scope.input_header.key] = $scope.input_header.value;
        initInputHeader();
    };

    $scope.removeXWWWFormData = function(index){
        $scope.req_info.data.XWWWFormData.splice(index, 1);
    };

    $scope.removeHeader = function(key){
        console.log(key);
        delete $scope.req_info.headers[key];
    };

    $scope.send = function(){

        do{
            initResult();
            //init error
            $scope.isError = {};

            //check json data format
            if($scope.req_info.contentType === CONTENT_TYPE_VALUE.JSON ){
                if(!checkJsonFormat()){
                    break;
                }
            }


            //send http request
            $scope.isSending = true;
            httpRequestService.send($scope.req_info)
                .then(function(http_info){
                    $scope.resultInfo.reqHeaders = http_info.req._headers;
                    $scope.resultInfo.postData = http_info.postData;
                    $scope.resultInfo.resHeaders = http_info.incomingMsg.headers;
                    $scope.resultInfo.resData = http_info.res_data;
                    showResult();
                }, function(http_info){
                    $scope.resultInfo.reqHeaders = http_info.req._headers;
                    $scope.resultInfo.postData = http_info.postData;
                    $scope.resultInfo.errorMsg = http_info.errorMsg;
                    showResult();
                });

        }while (false);
    };

    $scope.reset = function(){
        $scope.requestForm.$setPristine();
        $scope.isError = {};
        $scope.isSending = false;
        url_IsDropDown = false;
        initResult();
        initInputFormData();
        initInputHeader();
        initRequestInfo();
    };

    //========== init =========
    (function init(){
        $scope.CONTENT_TYPE_VALUE = CONTENT_TYPE_VALUE;
        $scope.isError = {};
        $scope.isSending = false;
        url_IsDropDown = false;
        initResult();
        initInputFormData();
        initInputHeader();
        initRequestInfo();
    })();
}];