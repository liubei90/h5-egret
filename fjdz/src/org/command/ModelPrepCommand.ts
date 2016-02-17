/**
 * Created by Administrator on 5/11 0011.
 */
class ModelPrepCommand extends puremvc.SimpleCommand {
    public constructor() {
        super();
    }

    public execute(notification:puremvc.INotification):void{
        this.facade.registerProxy(new GameContextProxy());
        this.facade.registerProxy(new ResultViewProxy());
    }
}