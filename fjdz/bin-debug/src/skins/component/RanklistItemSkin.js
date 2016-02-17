var skins;
(function (skins) {
    var component;
    (function (component) {
        var RanklistItemSkin = (function (_super) {
            __extends(RanklistItemSkin, _super);
            function RanklistItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [75, 484]);
                this.elementsContent = [this.avatar_uiasset_i(), this.nick_label_i(), this.score_label_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RanklistItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RanklistItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.nick_label_i = function () {
                var t = new egret.gui.Label();
                this.nick_label = t;
                this.__s(t, ["bottom", "maxDisplayedLines", "maxWidth", "text", "top", "verticalAlign", "x"], [0, 1, 184, "-", 0, "middle", 86]);
                return t;
            };
            __egretProto__.score_label_i = function () {
                var t = new egret.gui.Label();
                this.score_label = t;
                this.__s(t, ["bottom", "maxDisplayedLines", "maxWidth", "text", "top", "verticalAlign", "x"], [0, 1, 120, "0", 0, "middle", 361]);
                return t;
            };
            __egretProto__.avatar_uiasset_i = function () {
                var t = new egret.gui.UIAsset();
                this.avatar_uiasset = t;
                this.__s(t, ["height", "source", "verticalCenter", "width"], [75, "avatar_dfj", 0, 75]);
                return t;
            };
            RanklistItemSkin._skinParts = ["avatar_uiasset", "nick_label", "score_label"];
            return RanklistItemSkin;
        })(egret.gui.Skin);
        component.RanklistItemSkin = RanklistItemSkin;
        RanklistItemSkin.prototype.__class__ = "skins.component.RanklistItemSkin";
    })(component = skins.component || (skins.component = {}));
})(skins || (skins = {}));
