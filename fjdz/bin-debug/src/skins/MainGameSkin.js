var skins;
(function (skins) {
    var MainGameSkin = (function (_super) {
        __extends(MainGameSkin, _super);
        function MainGameSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [1136, 640]);
            this.elementsContent = [this.__3_i(), this.background_uiasset_i(), this.gamescreen_uiasset_i(), this.score_bitmaplabel_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = MainGameSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return MainGameSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.background_uiasset_i = function () {
            var t = new egret.gui.UIAsset();
            this.background_uiasset = t;
            this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
            return t;
        };
        __egretProto__.gamescreen_uiasset_i = function () {
            var t = new egret.gui.UIAsset();
            this.gamescreen_uiasset = t;
            this.__s(t, ["bottom", "left", "right", "top"], [0, 0, 0, 0]);
            return t;
        };
        __egretProto__.score_bitmaplabel_i = function () {
            var t = new egret.gui.BitmapLabel();
            this.score_bitmaplabel = t;
            this.__s(t, ["font", "text", "x", "y"], ["bfont2-export_fnt", "100", 39, 129]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source"], [0, "bkg_png"]);
            return t;
        };
        MainGameSkin._skinParts = ["background_uiasset", "gamescreen_uiasset", "score_bitmaplabel"];
        return MainGameSkin;
    })(egret.gui.Skin);
    skins.MainGameSkin = MainGameSkin;
    MainGameSkin.prototype.__class__ = "skins.MainGameSkin";
})(skins || (skins = {}));
