/**
 * Created by Administrator on 5/14 0014.
 */
var RanklistItem = (function (_super) {
    __extends(RanklistItem, _super);
    function RanklistItem() {
        _super.call(this);
        this.skinName = skins.component.RanklistItemSkin;
    }
    var __egretProto__ = RanklistItem.prototype;
    __egretProto__.dataChanged = function () {
        if (this.avatar_uiasset) {
            if (!this.avatarbmp) {
                this.avatarbmp = new egret.Bitmap();
                this.avatarbmp.width = this.avatar_uiasset.width;
                this.avatarbmp.height = this.avatar_uiasset.height;
            }
            this.avatarbmp.texture = RES.getRes("avatar_dfj");
            if (this.data["avatar"]) {
                RES.getResByUrl(this.data["avatar"], this.getAvatar, this, RES.ResourceItem.TYPE_IMAGE);
            }
        }
        if (this.nick_label) {
            if (this.data["nick"]) {
                this.nick_label.text = this.data["nick"];
            }
        }
        if (this.score_label) {
            if (this.data["score"]) {
                this.score_label.text = this.data["score"];
            }
        }
    };
    __egretProto__.getAvatar = function (d) {
        if (d) {
            this.avatarbmp.texture = d;
            if (this.avatar_uiasset) {
                this.avatar_uiasset.source = this.avatarbmp;
            }
        }
    };
    return RanklistItem;
})(egret.gui.ItemRenderer);
RanklistItem.prototype.__class__ = "RanklistItem";
