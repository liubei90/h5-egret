/**
 * Created by Administrator on 5/14 0014.
 */

class ResultViewProxy extends puremvc.Proxy {
    public static NAME:string = "ResultViewProxy";
    //"http://192.168.2.103:8080/testgame/ScorePro?clientkey=1e108ea876c749c0bdb94d4e0dc2f06b&score=7h221ia36gd4i46g&length=5";
    //http://localhost:8080/CihiMobileInfo/game/p/1000006/1e108ea876c749c0bdb94d4e0dc2f06b/7h221ia36gd4i46g/5/1    /p/{hino}/{ckey}/{score}/{len}/{gametype}
    private serverdomain:string = "http://192.168.2.103:8080/CihiMobileInfo/game";
    private hino:string = "1000188";
    private clientkey:string = "1e108ea876c749c0bdb94d4e0dc2f06c"
    private gametype:string = "1";
    //private serverdomain:string = "http://127.0.0.1:8080/test/hello";

    public constructor() {
        super(ResultViewProxy.NAME);
    }

    public postResult(s:number):void {

        var length:number = s.toString().length;
        var sorce:string = EncryptSorce.i().testPost(s);
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);

        var url:string = this.serverdomain+"/p/"+this.hino+"/"+this.clientkey+"/"+sorce+"/"+length+"/"+this.gametype;
        console.log(url);
        var request:egret.URLRequest = new egret.URLRequest(url);
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
    }

    private onPostComplete(event:egret.Event):void {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        var data:any = loader.data;
        console.dir(loader);
        console.dir(data);
        var c = JSON.parse(data);
        console.dir(c);
        if(c) {
            ApplicationFacade.getInstance().sendNotification(ResultViewMediator.UPDATE_INFO, c);
        }
    }

    private onIOError():void {
        var err:Object = new Object();
        err["errcode"] = 1;
        ApplicationFacade.getInstance().sendNotification(ResultViewMediator.UPDATE_INFO, err);
    }
}