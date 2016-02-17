/**
 * Created by Administrator on 7/10 0010.
 */
class StoneCallBack {
    private callback:Function;
    private obj:any;
    private param:any[] = [];
    private callcount:number = 0;

    public constructor(c:Function, o:any, p?:any[]) {
        this.obj = o;
        this.callback = c;
        this.param = p ? p : [];
    }

    public addCount():void {
        this.callcount++;
    }

    public resCount():void {
        this.callcount--;
        if(this.callcount == 0 && this.callback && this.obj) {
            this.callback.apply(this.obj, this.param);
        }
    }
}