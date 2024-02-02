import Konva from "konva";
import { CanvasShapeType } from "../CanvasShapeType";
import { CanvasRender } from "../CanvasRender";

export class newComment {
    group: Konva.Group
    circle: Konva.Circle
    text: Konva.Text

    constructor(params: CanvasShapeType, render: CanvasRender) {
        // 创建组
        this.group = new Konva.Group({
            id: params.id,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            draggable: false,
        })

        // 创建圆
        this.circle = new Konva.Circle({
            x: 0,
            y: 0,
            fill: 'yellow',
            radius: 18,
            shadowColor: '#000', // 阴影颜色
            shadowBlur: 5,       // 阴影模糊度
            shadowOffset: {       // 阴影偏移
                x: 0,
                y: 0
            },
            shadowOpacity: 0.22,    // 阴影透明度
        });
        // 创建文本
        this.text = new Konva.Text({
            text: params.title,
            x: 0,
            y: 0,
            fontSize: 16,
            lineHeight: 1,
            fill: 'black'
        });

        // 设置偏移量
        this.text.offsetX(this.text.width() / 2)
        this.text.offsetY(this.text.height() / 2 - 1)

        // 讲元素插入到组中
        this.group.add(this.circle, this.text);

        // 设置元素边界限定
        // this.group.dragBoundFunc;


        

    }

    


}