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

    positionXY(event){
        var playerPosition  = cc.v2(this.node.position.x, this.node.position.y);
        var mousePosition = event.getLocation();

        mousePosition = this.node.parent.convertToNodeSpaceAR(mousePosition);
        var angle = mousePosition.signAngle(playerPosition);
        console.log(angle);
    }
   
    onLoad(){
      this.node.parent.on('mousemove', this.positionXY, this);
    }

    start () {

    }

}
