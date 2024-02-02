import Konva from "konva";
import { CanvasShapeType } from "../CanvasShapeType";
import { CanvasRender } from "../CanvasRender/index";
import { EventHandlers, OtherMethods } from "../CanvasEvents/index";

export class newView {
    image: Konva.Image;
    imgElement: HTMLImageElement; 

    constructor(params: CanvasShapeType, canvasRender: CanvasRender) { 
        this.imgElement = new Image();

        // 图片加载完成事件
        this.imgElement.onload = () => {
            const defaultWidth = params.width || this.imgElement.width;
            const defaultHeight = params.height || this.imgElement.height;
            
            // 更新图片属性
            this.image.width(defaultWidth);
            this.image.height(defaultHeight);
            this.image.image(this.imgElement);

            // 更新舞台
            canvasRender.stage.draw();

            // 舞台中的元素加载完成后调用 handleStageLoad 方法
            EventHandlers.handleStageLoad(canvasRender);
        };

        

        // 创建 Konva.Image 实例
        this.image = new Konva.Image({
            image: this.imgElement,
            draggable: params.draggable,
        });

        // 创建 HTMLImageElement 实例
        this.imgElement.src = params.imageSrc;

    }
}