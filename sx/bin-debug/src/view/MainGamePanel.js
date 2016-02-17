/**
 * Created by Administrator on 7/6 0006.
 */
var MainGamePanel = (function (_super) {
    __extends(MainGamePanel, _super);
    function MainGamePanel() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var __egretProto__ = MainGamePanel.prototype;
    __egretProto__.onAddtoStage = function () {
        if (!this.bkbmp) {
            this.bkbmp = new egret.Bitmap();
            this.bkbmp.texture = RES.getRes("bg_png");
            this.bkbmp.height = this.bkbmp.texture.textureHeight * 2;
            this.bkbmp.fillMode = egret.BitmapFillMode.REPEAT;
            this.addChild(this.bkbmp);
        }
        var parent = this.parent;
        if (!parent) {
            console.log("something is wrong!!!");
        }
        this.x = (parent.width - this.bkbmp.width) * 0.5;
        this.y = this.x;
        if (!this.stonmanager) {
            this.stonmanager = new StoneManager();
            this.stonmanager.setContext(this);
            this.stonmanager.initStone2();
        }
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.touchEnabled = true;
        this.touchChildren = false;
    };
    __egretProto__.onTouchBegin = function (event) {
        if (GameContent.STONE_MOVEING != 0) {
            return;
        }
        var lx = event.localX;
        var ly = event.localY;
        if (this.stonmanager) {
            this.stonmanager.onTouchBegin(lx, ly);
        }
    };
    __egretProto__.onTouchMove = function (event) {
        if (GameContent.STONE_MOVEING != 0) {
            return;
        }
        var lx = event.localX;
        var ly = event.localY;
        if (this.stonmanager) {
            this.stonmanager.onTouchMove(lx, ly);
        }
    };
    return MainGamePanel;
})(egret.DisplayObjectContainer);
MainGamePanel.prototype.__class__ = "MainGamePanel";
