/**
 * Created by paddy on 2016/2/29.
 */
module.exports = ["node_fs", function(node_fs){

    let users = [ ];

    //login
    this.login = function(username, password){
        for (let user of users ){
            if(user.username === username && user.password === password){
                return true;
            }
        }
        return false;
    };

    this.getUserInfo = function(){
        node_fs.readFile('../post-super-man-db/userInfo.json', 'utf8', function (err, data) {
            if (err) throw err;
            if(JSON.parse(data) instanceof Array){
                users = JSON.parse(data);
            }else {
                throw "the userInfo data is not array!"
            }
        });
    };
}];