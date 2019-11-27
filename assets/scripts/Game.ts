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

    @property
    posX: number = 0;
    posY: number = 0;


    spawn(event){
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
    }

    start () {

    }

   
}
