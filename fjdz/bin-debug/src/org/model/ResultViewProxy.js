/**
 * Created by Administrator on 5/14 0014.
 */
var ResultViewProxy = (function (_super) {
    __extends(ResultViewProxy, _super);
    //private serverdomain:string = "http://127.0.0.1:8080/test/hello";
    function ResultViewProxy() {
        _super.call(this, ResultViewProxy.NAME);
        //"http://192.168.2.103:8080/testgame/ScorePro?clientkey=1e108ea876c749c0bdb94d4e0dc2f06b&score=7h221ia36gd4i46g&length=5";
        //http://localhost:8080/CihiMobileInfo/game/p/1000006/1e108ea876c749c0bdb94d4e0dc2f06b/7h221ia36gd4i46g/5/1    /p/{hino}/{ckey}/{score}/{len}/{gametype}
        this.serverdomain = "http://192.168.2.103:8080/CihiMobileInfo/game";
        this.hino = "1000188";
        this.clientkey = "1e108ea876c749c0bdb94d4e0dc2f06c";
        this.gametype = "1";
    }
    var __egretProto__ = ResultViewProxy.prototype;
    __egretProto__.postResult = function (s) {
        var length = s.toString().length;
        var sorce = EncryptSorce.i().testPost(s);
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        var url = this.serverdomain + "/p/" + this.hino + "/" + this.clientkey + "/" + sorce + "/" + length + "/" + this.gametype;
        console.log(url);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        //var variables:string = "score="+sorce+"&length="+length+"&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b8";
        //var variables:string = "score=7j548ha96saai6fs23&length=100&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b";
        //console.log(variables);
        //request.data = new egret.URLVariables(variables);
        loader.load(request);
        //var length:number = s.toString().length;
        //var sorce:string = EncryptSorce.i().testPost(s);
        //var loader:egret.URLLoader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        //loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        //var request:egret.URLRequest = new egret.URLRequest(this.serverdomain);
        //request.method = egret.URLRequestMethod.POST;
        //var variables:string = "score="+sorce+"&length="+length+"&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b8";
        ////var variables:string = "score=7j548ha96saai6fs23&length=100&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b";
        //console.log(variables);
        //request.data = new egret.URLVariables(variables);
        //loader.load(request);
        /*var length:number = s.toString().length;
        var sorce:string = EncryptSorce.i().testPost(s);
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        var request:egret.URLRequest = new egret.URLRequest(this.serverdomain+"?score="+sorce+"&length="+length+"&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b");
        request.method = egret.URLRequestMethod.GET;
        var variables:string = "score="+sorce+"&length="+length+"&clientkey=1e108ea876c749c0bdb94d4e0dc2f06b";
        console.log(variables);
        //request.data = new egret.URLVariables(variables);
        loader.load(request);*/
    };
    __egretProto__.onPostComplete = function (event) {
        var loader = event.target;
        var data = loader.data;
        console.dir(loader);
        console.dir(data);
        var c = JSON.parse(data);
        console.dir(c);
        if (c) {
            ApplicationFacade.getInstance().sendNotification(ResultViewMediator.UPDATE_INFO, c);
        }
    };
    __egretProto__.onIOError = function () {
        var err = new Object();
        err["errcode"] = 1;
        ApplicationFacade.getInstance().sendNotification(ResultViewMediator.UPDATE_INFO, err);
    };
    ResultViewProxy.NAME = "ResultViewProxy";
    return ResultViewProxy;
})(puremvc.Proxy);
ResultViewProxy.prototype.__class__ = "ResultViewProxy";
