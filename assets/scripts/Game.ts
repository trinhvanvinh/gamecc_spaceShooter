// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.Prefab)
    badguy: cc.Prefab = null;

    @property
    posX: number = 0;
    posY: number = 0;


    spawn(event){
        console.log(event);
        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.getChildByName('soldier1').position.x,this.node.getChildByName('soldier1').position.y);
        this.node.addChild(newBullet);

        var mousePosition = event.getLocation();
        mousePosition = this.node.convertToNodeSpaceAR(mousePosition);
        this.posX = mousePosition.x;
        this.posY = mousePosition.y;

        var actionBy = cc.moveTo(0.2, cc.v2(this.posX, this.posY));

        var destruction = cc.callFunc(function(){
            newBullet.destroy();
        }, this);

        var sequence = cc.sequence(actionBy, destruction);
        newBullet.runAction(sequence);

    }

    onLoad(){
        this.node.on('mousedown', this.spawn, this);
        this.schedule(this.createBad, 1, cc.macro.REPEAT_FOREVER,3 );
    }

    createBad(){
        var newBadGuy = cc.instantiate(this.badguy);
        var positions =[
            cc.v2(-778, 458), cc.v2(778, 458), cc.v2(779, 6), cc.v2(-780,20),
            cc.v2(778, 700), cc.v2(-778, -758), cc.v2(779, 200), cc.v2(-700,20),cc.v2(779,200),
        ];

        var badGuyPosition = Math.floor(Math.random() * positions.length );
        newBadGuy.setPosition(positions[badGuyPosition]);

    }

    start () {

    }

   
}
