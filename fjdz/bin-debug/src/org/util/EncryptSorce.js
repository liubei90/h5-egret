/**
 * Created by Administrator on 5/6 0006.
 */
var EncryptSorce = (function () {
    function EncryptSorce() {
        this.urlRequest = {};
        ;
    }
    var __egretProto__ = EncryptSorce.prototype;
    EncryptSorce.i = function () {
        if (!this.instance) {
            this.instance = new EncryptSorce();
        }
        return this.instance;
    };
    __egretProto__.getUrlRequest = function () {
        var url = window.location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (str.indexOf("&") != -1) {
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    this.urlRequest[strs[i].split("=")[0]] = strs[i].split("=")[1]; //decodeURI(strs[i].split("=")[1]);
                }
            }
            else {
                var key = str.substring(0, str.indexOf("="));
                var value = str.substr(str.indexOf("=") + 1);
                this.urlRequest[key] = decodeURI(value);
            }
        }
        console.dir(this.urlRequest);
    };
    __egretProto__.encryptSorce = function (s) {
        var clientkey = this.urlRequest["key"];
        if (!clientkey || clientkey.length <= 0) {
            return "";
        }
        if (clientkey.length < 8) {
            return "";
        }
        var strsorce = s.toString();
        strsorce = strsorce + strsorce.length;
        if (strsorce.length < 8) {
            strsorce = this.randomString(8 - strsorce.length) + strsorce;
        }
        console.log(strsorce);
        var out1 = "";
        var out2 = "";
        var str1 = clientkey.substr(0, strsorce.length);
        var str2 = clientkey.substr((clientkey.length - strsorce.length), strsorce.length);
        console.log("str1: " + str1 + " str2: " + str2);
        for (var i = 0; i < strsorce.length; i++) {
            var curNum = parseInt(strsorce.charAt(i));
            var curout1 = this.calcencryptchar(str1.charCodeAt(i), curNum);
            out1 = out1 + curout1;
            var curout2 = this.calcencryptchar(str2.charCodeAt(i), curNum);
            out2 = out2 + curout2;
        }
        console.log("out1: " + out1 + " out2: " + out2);
        var out = out1 + out2;
        return out;
    };
    __egretProto__.randomString = function (len) {
        var chars = GameConfig.STRING_CHAR;
        var maxPos = chars.length;
        var pwd = "";
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * 10));
        }
        return pwd;
    };
    __egretProto__.calcencryptchar = function (c, i) {
        var r = 0;
        var n = c + i;
        if (c >= 48 && c <= 57) {
            r = (n % 58) % 48 + 48;
        }
        else if (c >= 97 && c <= 122) {
            r = (n % 123) % 97 + 97;
        }
        return String.fromCharCode(r);
    };
    __egretProto__.testPost = function (s) {
        var clientkey = "1e108ea876c749c0bdb94d4e0dc2f06c";
        var strsorce = s.toString();
        strsorce = strsorce + strsorce.length;
        if (strsorce.length < 8) {
            strsorce = this.randomString(8 - strsorce.length) + strsorce;
        }
        console.log(strsorce);
        var out1 = "";
        var out2 = "";
        var str1 = clientkey.substr(0, strsorce.length);
        var str2 = clientkey.substr((clientkey.length - strsorce.length), strsorce.length);
        console.log("str1: " + str1 + " str2: " + str2);
        for (var i = 0; i < strsorce.length; i++) {
            var curNum = parseInt(strsorce.charAt(i));
            var curout1 = this.calcencryptchar(str1.charCodeAt(i), curNum);
            out1 = out1 + curout1;
            var curout2 = this.calcencryptchar(str2.charCodeAt(i), curNum);
            out2 = out2 + curout2;
        }
        console.log("out1: " + out1 + " out2: " + out2);
        var out = out1 + out2;
        return out;
    };
    return EncryptSorce;
})();
EncryptSorce.prototype.__class__ = "EncryptSorce";
