/**
 * Created by Administrator on 5/8 0008.
 */
class MainGame extends egret.gui.SkinnableComponent {
    public background_uiasset:egret.gui.UIAsset;
    public gameback:GameBack;
    public gamescreen_uiasset:egret.gui.UIAsset;
    public gamecontext:GameContext;
    public score_bitmaplabel:egret.gui.BitmapLabel;

    public constructor() {
        super();
        this.skinName = skins.MainGameSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);

        this.touchChildren = false;
    }

    private onCreateComplete():void {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        ApplicationFacade.getInstance().registerMediator(new MainGameMediator(this));
        //此时游戏主界面初始化完成且加载完成。
        ApplicationFacade.getInstance().sendNotification(GameCommand.STARTGAME);
    }
}