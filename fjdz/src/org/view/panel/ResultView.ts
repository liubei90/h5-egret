/**
 * Created by Administrator on 5/11 0011.
 */
class ResultView extends egret.gui.SkinnableComponent {
    public restart_uiasset:egret.gui.UIAsset;
    public score_bitmaplabel:egret.gui.BitmapLabel;
    public rank_bitmaplabel:egret.gui.BitmapLabel;
    public ranklist_datagroup:egret.gui.DataGroup;
    public ranklistarray:egret.gui.ArrayCollection;
    public wait_uiasset:egret.gui.UIAsset;

    public constructor() {
        super();
        this.skinName = skins.ResultViewSkin;
        //this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        ApplicationFacade.getInstance().registerMediator(new ResultViewMediator(this));
    }

    private onCreateComplete():void {
        console.log("ResultView onCreateComplete");
        //this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }
}