var skins;
(function (skins) {
    var LoadingViewSkin = (function (_super) {
        __extends(LoadingViewSkin, _super);
        function LoadingViewSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [1136, 640]);
            this.elementsContent = [this.__3_i(), this.__4_i(), this.start_uiasset_i(), this.progress_progressbar_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = LoadingViewSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return LoadingViewSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "gamelogo", 120]);
            return t;
        };
        __egretProto__.progress_progressbar_i = function () {
            var t = new egret.gui.ProgressBar();
            this.progress_progressbar = t;
            this.__s(t, ["horizontalCenter", "skinName", "value", "visible", "y"], [0, skins.component.ProgressBarSkin, 20, false, 848]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["height", "horizontalCenter", "source"], [1291, 0, "loadBK"]);
            return t;
        };
        __egretProto__.start_uiasset_i = function () {
            var t = new egret.gui.UIAsset();
            this.start_uiasset = t;
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "start", 758]);
            return t;
        };
        LoadingViewSkin._skinParts = ["start_uiasset", "progress_progressbar"];
        return LoadingViewSkin;
    })(egret.gui.Skin);
    skins.LoadingViewSkin = LoadingViewSkin;
    LoadingViewSkin.prototype.__class__ = "skins.LoadingViewSkin";
})(skins || (skins = {}));
