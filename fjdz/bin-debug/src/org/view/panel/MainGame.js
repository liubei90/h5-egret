/**
 * Created by Administrator on 5/8 0008.
 */
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        _super.call(this);
        this.skinName = skins.MainGameSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        this.touchChildren = false;
    }
    var __egretProto__ = MainGame.prototype;
    __egretProto__.onCreateComplete = function () {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        ApplicationFacade.getInstance().registerMediator(new MainGameMediator(this));
        //��ʱ��Ϸ��������ʼ�������Ҽ������ɡ�
        ApplicationFacade.getInstance().sendNotification(GameCommand.STARTGAME);
    };
    return MainGame;
})(egret.gui.SkinnableComponent);
MainGame.prototype.__class__ = "MainGame";
