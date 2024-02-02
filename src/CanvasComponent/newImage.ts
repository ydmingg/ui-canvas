import Konva from "konva";
import { CanvasShapeType } from "../CanvasShapeType";
import { CanvasRender } from "../CanvasRender/index";

export class newImage {
    image: Konva.Image;
    styles: CanvasShapeType
    CanvasRender: CanvasRender

    constructor(styles: CanvasShapeType, CanvasRender: CanvasRender) {
        this.styles = styles
        this.CanvasRender = CanvasRender
        this.image = new Konva.Image({
            image: new Image(),
            draggable: styles.draggable,
        });
        
        this.init();
    }

    // 初始化数据
    init() { 
        const imgElement = new Image();
        // 设置默认宽度和高度为 0
        let defaultWidth = this.styles.width || 0; // 默认宽度
        let defaultHeight = this.styles.height || 0; // 默认高度.

        // 设置图片源
        imgElement.src = this.styles.imageSrc;

        imgElement.onload = () => { 
            defaultWidth = this.styles.width || imgElement.width;
            defaultHeight = this.styles.height || imgElement.height;

            // 计算默认宽高的百分比
            const maxWidthPercentage = 0.9;
            const maxHeightPercentage = 0.9;
            // 计算图片的原始宽高比
            const scaleDefaultImage = imgElement.width / imgElement.height

            const maxWidth = this.CanvasRender.width * maxWidthPercentage;
            const maxHeight = this.CanvasRender.height * maxHeightPercentage;

            let finalWidth;
            let finalHeight;

            // 计算最终的宽度和高度
            if(imgElement.width > imgElement.height){
                finalWidth = Math.min(defaultWidth, maxWidth);
                finalHeight = finalWidth / scaleDefaultImage;
            }else if(imgElement.width < imgElement.height){
                finalHeight = Math.min(defaultHeight, maxHeight);
                finalWidth = finalHeight * scaleDefaultImage;
            }else{
                finalWidth = Math.min(defaultWidth, maxWidth);
                finalHeight = Math.min(defaultHeight, maxHeight);
            }

            const defaultX = this.styles.x || (this.CanvasRender.width - finalWidth) / 2;
            const defaultY = this.styles.y || (this.CanvasRender.height - finalHeight) / 2;
            this.image.x(defaultX)
            this.image.y(defaultY)
            this.image.width(finalWidth)
            this.image.height(finalHeight)
            this.image.image(imgElement);
            
            // console.log(this.CanvasRender.width);
            console.log("这个是图片元素，不是组件，待完善！！！！");
            
        };
    }
}
