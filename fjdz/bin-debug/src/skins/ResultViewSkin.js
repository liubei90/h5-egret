var skins;
(function (skins) {
    var ResultViewSkin = (function (_super) {
        __extends(ResultViewSkin, _super);
        function ResultViewSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [1136, 640]);
            this.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.restart_uiasset_i(), this.score_bitmaplabel_i(), this.rank_bitmaplabel_i(), this.ranklist_datagroup_i(), this.wait_uiasset_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = ResultViewSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return ResultViewSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["source", "x", "y"], ["scorce", 120, 38]);
            return t;
        };
        __egretProto__.__5_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "logo", 102]);
            return t;
        };
        __egretProto__.__6_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "listBK2", 336]);
            return t;
        };
        __egretProto__.rank_bitmaplabel_i = function () {
            var t = new egret.gui.BitmapLabel();
            this.rank_bitmaplabel = t;
            this.__s(t, ["font", "horizontalCenter", "text", "y"], ["bfont3-rank_fnt", 0, "0", 150]);
            return t;
        };
        __egretProto__.ranklist_datagroup_i = function () {
            var t = new egret.gui.DataGroup();
            this.ranklist_datagroup = t;
            this.__s(t, ["height", "width", "x", "y"], [492, 482, 120, 344]);
            return t;
        };
        __egretProto__.restart_uiasset_i = function () {
            var t = new egret.gui.UIAsset();
            this.restart_uiasset = t;
            this.__s(t, ["horizontalCenter", "source", "y"], [0, "again", 896]);
            return t;
        };
        __egretProto__.score_bitmaplabel_i = function () {
            var t = new egret.gui.BitmapLabel();
            this.score_bitmaplabel = t;
            this.__s(t, ["font", "text", "x", "y"], ["bfont2-export_fnt", "0", 314, 42]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["horizontalCenter", "source"], [0, "bkg_png"]);
            return t;
        };
        __egretProto__.wait_uiasset_i = function () {
            var t = new egret.gui.UIAsset();
            this.wait_uiasset = t;
            this.__s(t, ["source", "x", "y"], ["wait", 338, 594]);
            return t;
        };
        ResultViewSkin._skinParts = ["restart_uiasset", "score_bitmaplabel", "rank_bitmaplabel", "ranklist_datagroup", "wait_uiasset"];
        return ResultViewSkin;
    })(egret.gui.Skin);
    skins.ResultViewSkin = ResultViewSkin;
    ResultViewSkin.prototype.__class__ = "skins.ResultViewSkin";
})(skins || (skins = {}));
