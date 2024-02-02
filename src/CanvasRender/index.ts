import Konva from "konva";
import { CanvasShapeType } from "../CanvasShapeType";
import { SpaceItem } from "../CanvasApi";
import { EventHandlers, OtherMethods } from "../CanvasEvents/index";
import { newComment } from "../CanvasComponent/index";
import { newContainer } from "../CanvasComponent/index";
import { newImage } from "../CanvasComponent/index";
import { newRect } from "../CanvasComponent/index";
import { newView } from "../CanvasComponent/index";

export class CanvasRender {
    el: HTMLDivElement;
    width: number;
    height: number;
    stage: Konva.Stage
    layer: Konva.Layer;
    group: Konva.Group;
    spaceArr2: SpaceItem[];
    spaceArr: any[]; // 存储图形的数组
    scale: number; // 存储舞台缩放比
    x: number;
    y: number;
    isCanvasClickFlag: boolean = false; // 渲染或者打点
    isSpacePressed: boolean = false; // 是否按下空格键
    lastDragPosition: { x: number; y: number } | null = null; // 存储初始拖动位置
    lastStagePosition: { x: number; y: number } | null = null; // 存储初始阶段位置

    constructor( el: HTMLDivElement,width:number,height:number ) {
        // 初始化CanvasRender实例
        this.el = el
        this.width = width
        this.height = height
        this.stage = new Konva.Stage({container:this.el})
        this.layer = new Konva.Layer()
        this.group = new Konva.Group()
        this.spaceArr = []
        this.spaceArr2 = []
        this.scale = 1
        this.x = 0
        this.y = 0

        // 初始化加载
        this.init();
        
    }

    // 初始化
    init() { 
        // 初始化舞台尺寸
        this.stage.width(this.width)
        this.stage.height(this.height)

        // 将layer添加到stage中
        this.stage.add(this.layer);
    
        // 监听窗口变化事件
        window.addEventListener('resize', () => EventHandlers.handleWindowResize(this))
        // 监听滚轮滚动事件
        this.el.addEventListener('wheel', (event) => EventHandlers.handleWheel(event, this));
        // 监听空格键的keydown和keyup事件
        window.addEventListener('keydown', (event) => EventHandlers.handleKeyDown(event, this));
        window.addEventListener('keyup', (event) => EventHandlers.handleKeyUp(event, this));
        // 监听mousedown、mousemove和mouseup事件
        this.el.addEventListener('mousedown', (event) => EventHandlers.handleMouseDown(event, this));
        this.el.addEventListener('mousemove', (event) => EventHandlers.handleMouseMove(event, this));
        this.el.addEventListener('mouseup', () => EventHandlers.handleMouseUp(this));
        // 监听舞台上的mousedown、mousemove和mouseup事件
        this.stage.on('mousedown', (event) => EventHandlers.handleStageMouseDown(event, this));
        this.stage.on('mousemove', (event) => EventHandlers.handleStageMouseMove(event, this));
        this.stage.on('mouseup', () => EventHandlers.handleStageMouseUp(this));
        // 监听舞台上的点击事件
        this.stage.on('click', () => EventHandlers.handleCanvasClick(this));
        
    }

    // 创建评论点组件
    // CanvasComponent_Comment(params: CanvasShapeType) {
        
    //     // 创建点对象
    //     const comment = new newComment(params, this)
        

    //     // 将创建的group放到layer中
    //     this.layer.add(comment.group)

        
        
    //     // this.layer.add(container.group)

    //     //comment
    //     // 检查空格键是否按下，并跳过创建注释点
    //     if (this.isSpacePressed) return;
    //     const scale = this.stage.scaleX()
    //     let adjustedX;
    //     let adjustedY;

    //     // 根据画布单击标志计算调整后的坐标
    //     if(this.isCanvasClickFlag){
    //         adjustedX = this.x 
    //         adjustedY = this.y
    //         this.isCanvasClickFlag = false

    //     }else{
    //         adjustedX = Math.round((params.x - this.stage.x()) / scale);
    //         adjustedY = Math.round((params.y - this.stage.y()) / scale);
    //     }

    //     // 设置渲染评论点坐标
    //     comment.group.x(adjustedX)
    //     comment.group.y(adjustedY)
        

    //     // 更新 spaceArr 数组
    //     this.spaceArr.push({
    //         id: params.id,
    //         type: 'point',
    //         shape: [comment.group]
    //     })

    // }

    // // 创建容器组件
    // CanvasComponent_Container(params: CanvasShapeType){
    //     const container = new newContainer(params)
    //     this.layer.add(container.rect)
    //     this.layer.add(container.rectTitle)
        
    //     // 更新 spaceArr 数组
    //     this.spaceArr.push({
    //         id: params.id,
    //         type: 'container',
    //         shape: [container.rect,container.rectTitle]
    //     })
    // }

    // // 创建图片预览组件
    // CanvasComponent_View(params: CanvasShapeType){
    //     const view = new newView(params, this);
    //     this.layer.add(view.image)
    //     // 更新 spaceArr 数组
    //     this.spaceArr.push({
    //         id: params.id,
    //         type: 'view',
    //         shape: [view.image]
    //     })
    // }

    // // 创建图片元素
    // CanvasImage(params: CanvasShapeType) {
    //     const image = new newImage(params, this)
        
    //     this.layer.add(image.image)
    //     // 更新 spaceArr 数组
    //     this.spaceArr.push({
    //         id: params.id,
    //         type: 'image',
    //         shape: [image.image]
    //     })

    // }

    // // 创建矩形元素
    // CanvasRect(params:CanvasShapeType){
    //     const rect = new newRect(params)
    //     this.layer.add(rect.rect)
    //     // 更新 spaceArr 数组
    //     this.spaceArr.push({
    //         id: params.id,
    //         type: 'rect',
    //         shape: [rect.rect]
    //     })
    // }

    // 处理拖放功能的方法
    handleStartDrag(startX: number, startY: number) { OtherMethods.handleStartDrag(startX, startY, this) }
    handleDrag(mouseX: number, mouseY: number) { OtherMethods.handleDrag(mouseX, mouseY, this) }
    handleEndDrag() { OtherMethods.handleEndDrag(this) }
    // 处理移除元素方法
    handleClear(clear: string) { OtherMethods.handleClear(clear, this) }
    
    // 渲染接口方法
    // render = (Data: any[]) => {
    //     Data.forEach((item: { type: any; params: any }) => {
    //         const { type, params } = item;
    //         (this as any)[`Canvas${type}`](params);
            
    //     })

    //     // 更新整个舞台
    //     this.stage.draw();

    // }
    
    // 数据渲染
    newRender = (Data: any) => { 
        // 删除所有的子节点
        this.layer.destroyChildren();

        this.spaceArr2 = [];

        const rendersive = (items: any[], parentGroup: Konva.Group | Konva.Layer) => {
            
            items.forEach((itemLayer: any) => {
                const { type, params, groups, shapes } = itemLayer
                const shape = this.createShape(type, params, parentGroup)
                
                if (shape) { 
                    parentGroup.add(shape);
                    const spaceItem: SpaceItem = {
                        id: params.id,
                        type,
                        shape: [shape],
                    }
                    this.spaceArr2.push(spaceItem)
                }

                if (groups) {
                    const group = new Konva.Group();
                    parentGroup.add(group);
                    rendersive(groups, group);
                    
                }

                if (shapes) { 
                    rendersive(shapes, parentGroup);
                }
                
            })
        }

        rendersive(Data.layers, this.layer);

        this.stage.draw();
        
    }

    private createShape(type: string, params: CanvasShapeType, parentGroup: Konva.Group | Konva.Layer): Konva.Shape | undefined {
        
        switch (type) {
            case 'Component_Comment':
                // return new newComment(params, this).group;
                const comment = new newComment(params, this)

                this.layer.add(comment.group)

                // 标注点缩放缓动动画
                const tween = new Konva.Tween({
                    node: comment.group,
                    scaleX:1.6,
                    scaleY:1.6,
                    easing: Konva.Easings.EaseIn,
                    duration: .2,
                });
                comment.group.on('mouseover touchstart', ()=> {
                    this.stage.container().style.cursor = 'pointer';
                    tween.play(); // 启动动画
                })
                comment.group.on('mouseout touchend', ()=> {
                    this.stage.container().style.cursor = "default";
                    tween.reverse(); //暂停动画
                });

                // 检查空格键是否按下，并跳过创建注释点
                if (this.isSpacePressed) return;
                const scale = this.stage.scaleX()
                let adjustedX;
                let adjustedY;

                // 根据画布单击标志计算调整后的坐标
                if(this.isCanvasClickFlag){
                    adjustedX = this.x 
                    adjustedY = this.y
                    this.isCanvasClickFlag = false

                }else{
                    adjustedX = Math.round((params.x - this.stage.x()) / scale);
                    adjustedY = Math.round((params.y - this.stage.y()) / scale);
                }

                // 设置渲染评论点坐标
                comment.group.x(adjustedX)
                comment.group.y(adjustedY)

                console.log(type);
                
            // case 'Container':
            //     return new newContainer(params).rect;
            case 'Component_View':
                return new newView(params, this).image;
            // case 'Image':
            //     return new newImage(params, this).image;
            // case 'Rect':
            //     return new newRect(params).rect;
            default:
                return undefined;
        }
    }
    
}