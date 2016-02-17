/**
 * Created by Administrator on 5/6 0006.
 */
class EncryptSorce {
    private urlRequest:Object = {};
    private static instance:EncryptSorce;

    public constructor() {
        ;
    }

    public static i():EncryptSorce {
        if (!this.instance) {
            this.instance = new EncryptSorce();
        }
        return this.instance;
    }

    public getUrlRequest():void {
        var url = window.location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (str.indexOf("&") != -1) {
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    this.urlRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];//decodeURI(strs[i].split("=")[1]);
                }
            } else {
                var key = str.substring(0, str.indexOf("="));
                var value = str.substr(str.indexOf("=") + 1);
                this.urlRequest[key] = decodeURI(value);
            }
        }
        console.dir(this.urlRequest);
    }

    public encryptSorce(s:number):string {
        var clientkey:string = this.urlRequest["key"];
        if(!clientkey || clientkey.length <= 0) {
            return "";
        }
        if(clientkey.length < 8) {
            return "";
        }
        var strsorce:string = s.toString();
        strsorce = strsorce + strsorce.length;
        if(strsorce.length < 8) {
            strsorce = this.randomString(8-strsorce.length) + strsorce;
        }
        console.log(strsorce);
        var out1:string = "";
        var out2:string = "";
        var str1:string = clientkey.substr(0, strsorce.length);
        var str2:string = clientkey.substr((clientkey.length - strsorce.length), strsorce.length);
        console.log("str1: "+str1+" str2: "+str2);
        for(var i:number = 0; i< strsorce.length; i++) {
            var curNum:number = parseInt(strsorce.charAt(i));
            var curout1:string = this.calcencryptchar(str1.charCodeAt(i), curNum);
            out1 = out1 + curout1;
            var curout2:string = this.calcencryptchar(str2.charCodeAt(i), curNum);
            out2 = out2 + curout2;
        }
        console.log("out1: "+out1+" out2: " + out2);
        var out:string = out1 + out2;
        return out;
    }

    private randomString(len:number):string {
        var chars:string = GameConfig.STRING_CHAR;
        var maxPos = chars.length;
        var pwd:string = "";
        for (var i:number = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * 10));
        }
        return pwd;
    }

    private calcencryptchar(c:number, i:number):string {
        var r:number = 0;
        var n:number = c+i;
        if(c >= 48 && c <= 57) {
            r = (n%58)%48 + 48;
        }
        else if(c >= 97 && c <= 122) {
            r = (n%123)%97 + 97;
        }
        return String.fromCharCode(r);
    }

    public testPost(s:number):string {
        var clientkey:string = "1e108ea876c749c0bdb94d4e0dc2f06c";
        var strsorce:string = s.toString();
        strsorce = strsorce + strsorce.length;
        if(strsorce.length < 8) {
            strsorce = this.randomString(8-strsorce.length) + strsorce;
        }
        console.log(strsorce);
        var out1:string = "";
        var out2:string = "";
        var str1:string = clientkey.substr(0, strsorce.length);
        var str2:string = clientkey.substr((clientkey.length - strsorce.length), strsorce.length);
        console.log("str1: "+str1+" str2: "+str2);
        for(var i:number = 0; i< strsorce.length; i++) {
            var curNum:number = parseInt(strsorce.charAt(i));
            var curout1:string = this.calcencryptchar(str1.charCodeAt(i), curNum);
            out1 = out1 + curout1;
            var curout2:string = this.calcencryptchar(str2.charCodeAt(i), curNum);
            out2 = out2 + curout2;
        }
        console.log("out1: "+out1+" out2: " + out2);
        var out:string = out1 + out2;
        return out;
    }
}