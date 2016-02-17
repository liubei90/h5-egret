/**
 * Created by Administrator on 5/11 0011.
 */
class ViewPrepCommand extends puremvc.SimpleCommand {
    public constructor() {
        super();
    }

    public execute(notification:puremvc.INotification):void{
        var main:egret.gui.UIStage = notification.getBody();
        if(main) {
            this.facade.registerMediator(new GuiLayerMediator(main));
        }
    }

}