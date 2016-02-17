/**
 * Created by Administrator on 7/10 0010.
 */
var StoneCallBack = (function () {
    function StoneCallBack(c, o, p) {
        this.param = [];
        this.callcount = 0;
        this.obj = o;
        this.callback = c;
        this.param = p ? p : [];
    }
    var __egretProto__ = StoneCallBack.prototype;
    __egretProto__.addCount = function () {
        this.callcount++;
    };
    __egretProto__.resCount = function () {
        this.callcount--;
        if (this.callcount == 0 && this.callback && this.obj) {
            this.callback.apply(this.obj, this.param);
        }
    };
    return StoneCallBack;
})();
StoneCallBack.prototype.__class__ = "StoneCallBack";
