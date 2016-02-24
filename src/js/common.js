/**
 * Created by chunwei on 2016/2/17.
 */
var LU=LU||{};
function getJsonData(url,params,callback) {
    var jqxhr =$.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        dataType: "json"
    }).done(function (resultData){
        if('function'==typeof callback)
        callback(resultData);
        console.log(resultData.code+" : " +resultData.message);
    });
}

// 全局ajax错误处理
$( document ).ajaxError(function( event, request, settings ) {
    LU.msgtips( "与服务器通信时发生错误，操作不成功 " ,{type:"error"});
});

// 提示
LU.msgtips = function(msg, opts){
    var opts=opts||{};
    var msgClass="msgtips ";
    if(typeof opts.type==='string')msgClass+=opts.type;
    var msg = $('<div class="'+msgClass+'"><div>' + msg + '</div></div>').appendTo($(document.body));
    msg.animate({ 'top':0 }, 200);
    setTimeout(function(){ msg.animate({ 'top':-36 }, 200,function(){msg.remove();}); }, opts.timeout || 3000);
};

//比较两个简单的对象的值是否相等
LU.equals= function(a,b){
    if(a===b)return true;
    if(a==b)return true;
    try {
        if (JSON.stringify(a) == JSON.stringify(b))return true;
    }catch (ex){
    }
    return false;
};

//元素在数组中的位置
if(!Array.prototype.indexOfByValue){
    Array.prototype.indexOfByValue = function(el){
        for (var i=0,n=this.length; i<n; i++){
            if (LU.equals(this[i], el)){
                return i;
            }
        }
        return -1;
    }
}

var TplReg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm'); //i g m是指分别用于指定区分大小写的匹配、全局匹配和多行匹配。
/**
 * 模板实例化
 * 用例：instantiate("name:[name]",{ name: '占占'});//返回"name: 占占"
 */
function instantiate(template,params){
    return template.replace(TplReg, function (node, key) { return ("undefined"!=typeof params[key])?params[key]:'';  });
}