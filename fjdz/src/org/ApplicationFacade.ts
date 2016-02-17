/**
 * Created by Administrator on 5/11 0011.
 */
class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade {
    public static STARTUP:string = "startup";

    public constructor() {
        super();
    }

    public static getInstance():ApplicationFacade {
        if(this.instance == null) {
            this.instance = new ApplicationFacade();
        }
        return <ApplicationFacade><any> (this.instance);
    }

    public initializeController():void{
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
    }

    public startGame(gameContainer:egret.gui.UIStage):void {
        this.sendNotification(ApplicationFacade.STARTUP, gameContainer);
        this.removeCommand(ApplicationFacade.STARTUP);
    }
}