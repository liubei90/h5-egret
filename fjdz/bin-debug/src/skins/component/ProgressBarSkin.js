var skins;
(function (skins) {
    var component;
    (function (component) {
        var ProgressBarSkin = (function (_super) {
            __extends(ProgressBarSkin, _super);
            function ProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [58, 462]);
                this.elementsContent = [this.__3_i(), this.track_i(), this.thumb_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source"], [0, "borderprogress"]);
                return t;
            };
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["scale9Grid", "source", "x", "y"], [egret.gui.getScale9Grid("0,0,1,97"), "rprogress", 4, -21]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["source", "width", "x", "y"], ["gprogress", 453, 4, -20]);
                return t;
            };
            ProgressBarSkin._skinParts = ["track", "thumb"];
            return ProgressBarSkin;
        })(egret.gui.Skin);
        component.ProgressBarSkin = ProgressBarSkin;
        ProgressBarSkin.prototype.__class__ = "skins.component.ProgressBarSkin";
    })(component = skins.component || (skins.component = {}));
})(skins || (skins = {}));
