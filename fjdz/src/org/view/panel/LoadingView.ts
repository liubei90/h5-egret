/**
 * Created by Administrator on 5/11 0011.
 */
class LoadingView extends egret.gui.SkinnableComponent {
    private start_uiasset:egret.gui.UIAsset;
    private progress_progressbar:egret.gui.ProgressBar;


    public constructor() {
        super();
        this.skinName = skins.LoadingViewSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }

    private onCreateComplete():void {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        if(this.start_uiasset) {
            this.start_uiasset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTap, this);
        }
    }

    public setProgress(c:number, t:number):void {
        var pro:number = c/t*100;
        if(pro < 20) {
            return;
        }
        else {
            if(this.progress_progressbar) {
                this.progress_progressbar.setValue(pro);
            }
        }
    }

    private onStartTap():void {
        this.start_uiasset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTap, this);
        this.start_uiasset.visible = false;
        if(this.progress_progressbar) {
            this.progress_progressbar.visible = true;
        }
        RES.loadGroup("preload");
    }
}