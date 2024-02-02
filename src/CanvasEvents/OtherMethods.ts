import { CanvasRender } from "../CanvasRender/index";

export class OtherMethods {
    // 处理鼠标位置和舞台位置方法
    static handleStartDrag(startX: number, startY: number, canvasRender: CanvasRender) { 
        // 存储初始鼠标位置和舞台位置
        canvasRender.lastDragPosition = { x: startX, y: startY };
        canvasRender.lastStagePosition = { x: canvasRender.stage.x(), y: canvasRender.stage.y() };
    }
    // 
    static handleDrag(mouseX: number, mouseY: number, canvasRender: CanvasRender) { 
        if(!canvasRender.lastDragPosition) return
        if(!canvasRender.lastStagePosition) return
        // 计算移动的距离
        const deltaX = mouseX - canvasRender.lastDragPosition.x;
        const deltaY = mouseY - canvasRender.lastDragPosition.y;

        // 更新舞台位置
        canvasRender.stage.x(canvasRender.lastStagePosition.x + deltaX);
        canvasRender.stage.y(canvasRender.lastStagePosition.y + deltaY);

        // 刷新舞台
        canvasRender.stage.batchDraw();
    }
    //
    static handleEndDrag(canvasRender: CanvasRender) { 
        // 清除存储位置
        canvasRender.lastDragPosition = null;
        canvasRender.lastStagePosition = null;
    }
    
    // 移除元素事件（测试阶段，请勿使用！！！！）
    static handleClear(clear:string,canvasRender: CanvasRender) { 
        const comment = canvasRender.stage.findOne(`#${clear}`)
        comment?.destroy();

        // 更新舞台
        canvasRender.layer.draw()
    }


}