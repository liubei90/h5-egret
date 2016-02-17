/**
 * Created by Administrator on 5/12 0012.
 */
class Airplain extends egret.Bitmap {
    private static airbasespeed:number = 7;
    private airtype:number = 0;
    private airspeed:number = 0;
    private airdestoryindex:number = 0;
    private airhealth:number = 0;
    private airScore:number = 0;

    private static airpool:Airplain[] = [];
    private static airanimation:Object = {
        "1": ["me_png", "me_die1_png", "die2_png", "die3_png"],
        "2": ["plain1_png", "plain1_die1_png", "die2_png", "die3_png"],
        "3": ["plain2_png", "plain2_die1_png", "die2_png", "die3_png"],
        "4": ["plain3_png", "plain3_die1_png", "die1_png", "die2_png", "die3_png"]
    };

    public constructor() {
        super();
    }

    public setAirType(i:number):void {
        this.airtype = i;
        var texture:string = Airplain.airanimation[i.toString()][0];
        this.texture = RES.getRes(texture);
        this.resetAir();
    }

    public getAirType():number {
        return this.airtype;
    }

    public getAirscore():number {
        return this.airScore;
    }

    public resetAir():void {
        this.airdestoryindex = 0;
        switch (this.airtype) {
            case 1:
                this.airhealth = 1;
                break;
            case 2:
                this.airhealth = 1;
                this.airScore = 10;
                this.airspeed = 7;
                break;
            case 3:
                this.airhealth = 3;
                this.airScore = 20;
                this.airspeed = 5;
                break;
            case 4:
                this.airhealth = 6;
                this.airScore = 50;
                this.airspeed = 1;
                break;
        }
    }

    public updatePos():void {
        this.y = this.y+this.airspeed+Airplain.airbasespeed;
    }

    public static getAirplain(i:number):Airplain {
        var a:Airplain;
        if(this.airpool.length > 0) {
            a = this.airpool.shift();
        }
        else {
            a = new Airplain();
        }
        a.setAirType(i);
        return a;
    }

    public static destoryAirplain(a:Airplain):void {
        if(Airplain.airpool.indexOf(a) < 0) {
            Airplain.airpool.push(a);
        }
    }

    public static addAirSpeed():void {
        Airplain.airbasespeed++;
    }

    public static resetAirSpeed():void {
        Airplain.airbasespeed = 9;
    }

    public animationDestory():boolean {
        var res:boolean = false;
        var queue:string[] = Airplain.airanimation[this.airtype.toString()];
        if(queue) {
            if(this.airdestoryindex >= queue.length) {
                res = true;
            }
            else {
                this.airdestoryindex++;
                this.texture = RES.getRes(queue[this.airdestoryindex]);
            }
        }
        return res;
    }

    public checkDead():boolean {
        var res:boolean = false;
        this.airhealth--;
        if(this.airhealth <= 0) {
            res = true;
        }
        return res;
    }
}