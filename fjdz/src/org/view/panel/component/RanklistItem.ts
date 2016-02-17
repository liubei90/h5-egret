/**
 * Created by Administrator on 5/14 0014.
 */
class RanklistItem extends egret.gui.ItemRenderer {
    private avatar_uiasset:egret.gui.UIAsset;
    private avatarbmp:egret.Bitmap;
    private nick_label:egret.gui.Label;
    private score_label:egret.gui.Label;

    public constructor() {
        super();
        this.skinName = skins.component.RanklistItemSkin;
    }

    public dataChanged():void {
        if(this.avatar_uiasset) {
            if(!this.avatarbmp) {
                this.avatarbmp = new egret.Bitmap();
                this.avatarbmp.width = this.avatar_uiasset.width;
                this.avatarbmp.height = this.avatar_uiasset.height;
            }
            this.avatarbmp.texture = RES.getRes("avatar_dfj");
            if(this.data["avatar"]) {
                RES.getResByUrl(this.data["avatar"], this.getAvatar, this, RES.ResourceItem.TYPE_IMAGE);
            }
        }
        if(this.nick_label) {
            if(this.data["nick"]) {
                this.nick_label.text = this.data["nick"];
            }
        }
        if(this.score_label) {
            if(this.data["score"]) {
                this.score_label.text = this.data["score"];
            }
        }
    }

    private getAvatar(d):void {
        if(d) {
            this.avatarbmp.texture = d;
            if(this.avatar_uiasset) {
                this.avatar_uiasset.source = this.avatarbmp;
            }
        }
    }
}