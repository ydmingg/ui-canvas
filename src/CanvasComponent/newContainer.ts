import Konva from "konva";
import { CanvasShapeType } from "../CanvasShapeType";

export class newContainer {
    rect:Konva.Rect
    rectTitle: Konva.Text

    constructor(params: CanvasShapeType){
        this.rect = new Konva.Rect({
            x: params.x,
            y: params.y,
            width: params.width,
            height: params.height,
            fill: params.fill,
            draggable: params.draggable,
        })

        this.rectTitle = new Konva.Text({
            x: params.x,
            y: params.y - 14,
            text: params.title,
            fontSize: 12,
            fill: "#ABABAB",
        })
    }
}
