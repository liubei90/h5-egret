/**
 * Created by Administrator on 5/11 0011.
 */
class GuiLayerMediator extends puremvc.Mediator implements puremvc.IMediator {
    public  static NAME:string = "GuiLayerMediator";
    private maingame:MainGame = new MainGame();
    private resultview:ResultView = new ResultView();

    public constructor(viewComponent:any) {
        super(GuiLayerMediator.NAME, viewComponent);
    }

    public listNotificationInterests():Array<any> {
        return[];
    }

    public handleNotification(notification:puremvc.INotification):void {
        switch (notification.getName()) {

        }
    }

    public get guilayer():egret.gui.UIStage {
        return <egret.gui.UIStage><any>this.viewComponent;
    }

    public changeScreen(n:number):void {
        if(n == 1) {
            this.openMainGame();
        }
        else if(n == 2) {
            this.openResult();
        }
    }

    private openMainGame():void {
        if(!this.maingame) {
            console.log("guilayer maingame is init err!");
            return;
        }
        var main_:egret.gui.UIStage = this.guilayer;
        if(main_) {
            main_.removeAllElements();
            main_.addElement(this.maingame);
        }
    }

    private openResult():void {
        if(!this.resultview) {
            console.log("guilayer resultview is init err!");
            return;
        }
        var main_:egret.gui.UIStage = this.guilayer;
        if(main_) {
            main_.removeAllElements();
            main_.addElement(this.resultview);
        }
    }
}