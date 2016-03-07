/**
 * Created by paddy on 2016/3/1.
 */
module.exports = ["node_http", "$q", "node_querystring", "node_url", "CONTENT_TYPE_VALUE", "node_zlib",  function(node_http, $q, node_querystring, node_url, CONTENT_TYPE_VALUE, node_zlib){

    let getPostData = function(contentType, data){
        switch (contentType){
            case CONTENT_TYPE_VALUE.X_WWW_FORM_URLENCODED:
                let queryString = "";
                for (let i = 0; i< data.XWWWFormData.length; i++){
                    if(queryString.length === 0){
                        queryString += data.XWWWFormData[i].key + "=" + data.XWWWFormData[i].value;
                    }else {
                        queryString += "&" + data.XWWWFormData[i].key + "=" + data.XWWWFormData[i].value;
                    }
                }
                return queryString;
                break;
            case CONTENT_TYPE_VALUE.JSON:
                return JSON.stringify(JSON.parse(data.json));
                break;
            default :
                return "";
        }
    };

    let getContentType = function(contentType, method){

        switch (method){
            case "GET":
                return "";
                break;
            case "DELETE":
                return "";
                break;
        }

        switch (contentType){
            case CONTENT_TYPE_VALUE.X_WWW_FORM_URLENCODED:
                return "application/x-www-form-urlencoded; charset=UTF-8";
                break;
            case CONTENT_TYPE_VALUE.JSON:
                return "application/JSON; charset=UTF-8";
                break;
            default :
                return "";
        }
    };

    let convertContentEncoding = function(res, http_info, d){

            switch (res.headers['content-encoding']) {
                case 'gzip':
                    let gunzip = node_zlib.createGunzip();
                    let _data = "";
                    gunzip.on('data', function(data){
                        _data += data.toString();
                    });
                    gunzip.on('end', function(){
                        http_info.res_data = _data;
                        d.resolve(http_info);
                    });
                    res.pipe(gunzip);
                    break;
                case 'deflate':
                    //http_info.res_data.pipe(node_zlib.createInflate());
                    break;
                default:
                    res.on('data', (chunk) => {
                        http_info.res_data += chunk;
                    });
                    res.on('end', () => {
                        d.resolve(http_info);
                    });
                    return;
            }

    };

    let setRequestHeader = function(_defaultHeader, headers){
        for(let key in headers){
            _defaultHeader[key] = headers[key]
        }
    };

    this.send = function(req_info){

        let d = $q.defer();

        let urlMsg =  node_url.parse("http://" + req_info.url);
        let postData = getPostData(req_info.contentType, req_info.data);
        let _contentType = getContentType(req_info.contentType, req_info.method);

        //default the headers
        let _headers = {
            "Refer" : "http://" + req_info.url,
            "Origin": "http://" + urlMsg.host,
            "Accept": "application/json, text/plain, */*",
            //"Accept-Encoding": "gzip, deflate, sdch",
            "Accept-Language": "zh-CN,zh;q=0.8",
            "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
            "Connection": "keep-alive"
        };

        //override the headers
        if(_contentType){
            _headers['Content-Type'] = _contentType;
            _headers['Content-Length'] = postData.length;
        }

        setRequestHeader(_headers, req_info.headers);

        //set options
        let options = { headers: {} };
        options['hostname'] = urlMsg.hostname;
        options['port'] = urlMsg.port;
        options['method'] = req_info.method;
        options['path'] = urlMsg.path;
        options['hostname'] = urlMsg.hostname;
        options['headers'] = _headers;

        let http_info = {
            res_data: "",
            postData : postData
        };

        let req = node_http.request(options, (res) => {
            res.setEncoding('utf8');
            http_info.incomingMsg = res;
            convertContentEncoding(res, http_info, d);
        });

        req.on('error', (e) => {
            http_info.errorMsg = e.message;
            d.reject(http_info);
        });

        // write data to request body
        req.write(postData);
        req.end();

        http_info.req = req;
        return d.promise;
    }
}];