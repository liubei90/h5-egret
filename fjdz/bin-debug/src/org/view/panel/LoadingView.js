/**
 * Created by Administrator on 5/11 0011.
 */
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        _super.call(this);
        this.skinName = skins.LoadingViewSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }
    var __egretProto__ = LoadingView.prototype;
    __egretProto__.onCreateComplete = function () {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        if (this.start_uiasset) {
            this.start_uiasset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTap, this);
        }
    };
    __egretProto__.setProgress = function (c, t) {
        var pro = c / t * 100;
        if (pro < 20) {
            return;
        }
        else {
            if (this.progress_progressbar) {
                this.progress_progressbar.setValue(pro);
            }
        }
    };
    __egretProto__.onStartTap = function () {
        this.start_uiasset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTap, this);
        this.start_uiasset.visible = false;
        if (this.progress_progressbar) {
            this.progress_progressbar.visible = true;
        }
        RES.loadGroup("preload");
    };
    return LoadingView;
})(egret.gui.SkinnableComponent);
LoadingView.prototype.__class__ = "LoadingView";
