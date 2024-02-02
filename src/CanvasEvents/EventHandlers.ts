import Konva from "konva";
import { CanvasRender } from "../CanvasRender/index";

export class EventHandlers {
    // 处理在加载完成后调整舞台和元素的尺寸和位置
    static handleStageLoad(canvasRender: CanvasRender) { 
        // 获取所有元素的边界框
        const elementsBoundingBox = canvasRender.stage.getClientRect();
        // 记录当前舞台缩放比例
        let scaleBy = canvasRender.scale;

        // 处理舞台所有元素边界框和当前舞台大小
        if (elementsBoundingBox.width > canvasRender.stage.width() || elementsBoundingBox.height > canvasRender.stage.height()) {
            // 计算所有元素对应新的舞台比例
            scaleBy = Math.min(
                (canvasRender.stage.width() - 20) / elementsBoundingBox.width,
                (canvasRender.stage.height() - 20) / elementsBoundingBox.height
            );
        }

        // 计算最小边界框的左上角相对于舞台原点 (0, 0) 的偏移量
        const offset = {
            x: elementsBoundingBox.x,
            y: elementsBoundingBox.y 
        };

        // 计算新的舞台尺寸，确保能够容纳所有元素
        const newElementBoundingBoxWidth = Math.round((elementsBoundingBox.width + offset.x) * scaleBy);
        const newElementBoundingBoxHeight = Math.round((elementsBoundingBox.height + offset.y) * scaleBy);
        
        
        // 更新舞台位置
        canvasRender.stage.x((canvasRender.stage.width() - newElementBoundingBoxWidth) / 2);
        canvasRender.stage.y((canvasRender.stage.height() - newElementBoundingBoxHeight) / 2);


        // 更新舞台缩放比例
        canvasRender.stage.scale({ x: scaleBy, y: scaleBy });

        // 更新舞台
        canvasRender.stage.batchDraw();

        // 更新CanvasRender实例属性
        canvasRender.scale = scaleBy;

    }

    // 处理窗口事件并更新舞台属性
    static handleWindowResize(canvasRender: CanvasRender) { 
        // 获取容器的新尺寸
        const newWidth = canvasRender.el.clientWidth;
        const newHeight = canvasRender.el.clientHeight;
        // 更新舞台尺寸
        canvasRender.stage.width(newWidth);
        canvasRender.stage.height(newHeight);
        // 更新CanvasRender实例属性
        canvasRender.width = newWidth
        canvasRender.height = newHeight
        
        // 更新舞台
        canvasRender.stage.draw();
        
    }

    // 滚轮位移事件（同时按住ctrl或者win时画布缩放）
    static handleWheel(event: WheelEvent, canvasRender: CanvasRender){
        // 获取指针在画布上的位置
        const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d
        const step = 10

        // 检测鼠标滚轮方向
        let direction = event.deltaY > 0 ? -1 : 1;
        // 获取舞台的当前比例
        const oldScale = canvasRender.stage.scaleX();
        // 计算画布上的点以放大/缩小
        const mousePointTo = {
            x: (position.x - canvasRender.stage.x()) / oldScale,
            y: (position.y - canvasRender.stage.y()) / oldScale
        }
        
        // 设置比例因子
        const scaleBy = 1.05;
        const minScaleBy = 0.02
        const maxScaleBy = 256
        let newScale;
        
        //检查是否按下了Ctrl或Command(win)键
        if (event.ctrlKey || event.metaKey) {
            // 根据鼠标滚轮方向放大/缩小
            newScale = event.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy   
            // 添加缩放的最大值和最小值限制
            newScale = Math.min(maxScaleBy, Math.max(minScaleBy, newScale));

            // 禁止浏览器缩放
            event.preventDefault();
            // 阻止 Windows 系统弹窗
            event.stopPropagation();
            
            // 将新的比例应用到舞台上
            canvasRender.stage.scale({ x: newScale, y: newScale })

            // 计算缩放后的新位置
            const newPos = {
                x: position.x - mousePointTo.x * newScale,
                y: position.y - mousePointTo.y * newScale
            }

            // 更新舞台位置
            canvasRender.stage.position(newPos)

            // 迭代每个newComment并调整坐标和大小
            // console.log(canvasRender.spaceArr);
            
            
            // canvasRender.newComments.forEach(comment => {
            //     comment.group.scale({
            //         x: 1 / newScale,
            //         y: 1 / newScale
            //     });
            //     comment.group.position({
            //         x: comment.group.x() / newScale,
            //         y: comment.group.y() / newScale
            //     });
            // });




            // 批量绘制以更新舞台
            canvasRender.stage.batchDraw();

            // 更新CanvasRender实例属性
            canvasRender.scale = newScale
        } else { 
            // 保持当前比例并垂直移动画布
            newScale = oldScale
            canvasRender.stage.y(canvasRender.stage.y() + step * direction)
            canvasRender.scale = newScale
        }
        
        // 防止默认的车轮事件行为
        event.preventDefault()
        
    }

    // 处理空格键的keydown和keyup事件
    static handleKeyDown(event: KeyboardEvent,canvasRender: CanvasRender){
        if (event.key === ' ') {
            canvasRender.isSpacePressed = true;
            // 按空格键时防止滚动
            event.preventDefault();
            canvasRender.el.style.cursor = "grab";
        }
    }
    
    // 处理空格键的上键事件
    static handleKeyUp(event: KeyboardEvent,canvasRender: CanvasRender){
        if (event.key === ' ') {
            canvasRender.isSpacePressed = false;
            canvasRender.el.style.cursor = "default";
        }
        
    }

    // 处理鼠标按下事件
    static handleMouseDown(event: MouseEvent,canvasRender: CanvasRender){
        if (event.button === 0 || event.button === 1) {
            // 单击鼠标左键或中键时开始拖动
            canvasRender.handleStartDrag(event.clientX, event.clientY);
            canvasRender.el.style.cursor = "default";
        }

    }

    // 处理鼠标移动事件
    static handleMouseMove(event: MouseEvent,canvasRender: CanvasRender){
        if ((event.buttons === 1 || event.buttons === 4) && canvasRender.isSpacePressed) {
            canvasRender.handleDrag(event.clientX, event.clientY);
        }

    }

    static handleMouseUp(canvasRender: CanvasRender){
        canvasRender.el.style.cursor = "default";
        canvasRender.handleEndDrag();

    }
    // 处理舞台上的mousedown、mousemove和mouseup事件
    static handleStageMouseDown(event: Konva.KonvaEventObject<MouseEvent>,canvasRender: CanvasRender){
        if (event.evt.button === 1) {
            canvasRender.handleStartDrag(event.evt.clientX, event.evt.clientY);
        }
    }
    static handleStageMouseMove(event: Konva.KonvaEventObject<MouseEvent>,canvasRender: CanvasRender){
        if (event.evt.buttons === 4 ) {
            canvasRender.handleDrag(event.evt.clientX, event.evt.clientY);
            canvasRender.el.style.cursor = "grab";
        }
    }
    static handleStageMouseUp(canvasRender: CanvasRender){
        canvasRender.el.style.cursor = "default";
        canvasRender.handleEndDrag();
    }

    // 更新当前的舞台点击时的坐标点
    static handleCanvasClick(canvasRender: CanvasRender) { 
        


        const position = canvasRender.stage.getPointerPosition() as Konva.Vector2d
        const scale = canvasRender.stage.scaleX();
        // 根据比例计算画布坐标
        canvasRender.x = Math.round((position.x - canvasRender.stage.x()) / scale);
        canvasRender.y = Math.round((position.y - canvasRender.stage.y()) / scale);
        // 设置标志以指示画布单击
        canvasRender.isCanvasClickFlag = true;
    }


}