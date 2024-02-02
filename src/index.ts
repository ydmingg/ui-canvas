import { CanvasRender } from "../index";
const app = document.querySelector("#app") as HTMLDivElement
const { clientWidth, clientHeight } = app


// 实例化CanvasRender
const canvas = new CanvasRender(app, clientWidth, clientHeight);
const src = "https://static.funxdata.com/2023/12/28/3d482287a2bf4f4c9d5ec19a4ff7449d.png"

// 动态数据
const imageData = {
    layers: [
        {
            type: "Component_View",
            params: {
                id: "image1",
                // title: "图片",
                // x: 100,
                // y: 100,
                imageSrc: src,
                // width: 100,
                // height: 50,
                // draggable: false,
    
            }
        },
        // {
        //     type: "Rect",
        //     params: {
        //         id: "Rect1",
        //         title: "图形2",
        //         x: 200,
        //         y: 200,
        //         width: 600,
        //         height: 300,
        //         fill: "green",
        //         draggable: true,
                
        //     }
        // },
        
    ]
}

// 根据Data绘制一个图形
canvas.newRender(imageData)


// 渲染坐标点
// for (let i = 0; i < 10; i++) {
//     const commentArr = {
//         layers: [
//             {
//                 type: "Component_Comment",
//                 params: {
//                     id: "comment" + 1,
//                     title: i,
//                     x: i*30,
//                     y: i*10
//                 }
//             } 
//         ]
//     }
    
//     canvas.newRender(commentArr)
    
// }


// // // 打点
// let oCanvas = app.querySelector('canvas') as HTMLElement;
// oCanvas.addEventListener('click', (e) => { 
//     let commentData = [
//         {
//             type: "Component_Comment",
//             params: {
//                 id: "01",
//                 title: 2,
//                 x: canvas.x,
//                 y: canvas.y
//             }
//         }
//     ]
    
//     canvas.render(commentData)

//     // 当前舞台缩放比例：
//     console.log("舞台缩放比例：",Math.round((canvas.scale * 100)) + "%");
// })


let data = {
    layers: [
        {
            id: 'layer1',
            name: 'Layer 1',
            fill: 'white',
            groups: [
                {
                    id: 'group1',
                    name: 'Group 1',
                    params: {
                        x: 50,
                        y: 50,
                        scaleX: 1,
                        scaleY: 1,
                        draggable: true,
                    },
                    shapes: [
                        {
                            id: 'shape1',
                            name: "Shape 1",
                            type: 'Rect',
                            params: {
                                x: 10,
                                y: 10,
                                width: 50,
                                height: 30,
                                fill: 'blue',
                            },
                        },
                        // ...组内的其他形状
                    ],
                },
                // ... 层内的其他组
                
            ],
            shapes: [
                {
                    id: 'shape1',
                    name: "Shape 1",
                    type: 'Rect',
                    params: {
                        x: 50,
                        y: 50,
                        width: 50,
                        height: 30,
                        fill: 'red',
                    },
                },
                // ...组内的其他形状
            ],
        },
        {
            id: 'layer2',
            name: 'Layer 2',
            fill: 'white',
            groups: [
                {
                    id: 'group1',
                    name: 'Group 1',
                    params: {
                        x: 50,
                        y: 50,
                        scaleX: 1,
                        scaleY: 1,
                        draggable: true,
                    },
                    shapes: [
                        {
                            id: 'shape1',
                            name: "Shape 1",
                            type: 'Rect',
                            params: {
                                x: 100,
                                y: 100,
                                width: 50,
                                height: 30,
                                fill: 'blue',
                            },
                        },
                        // ...组内的其他形状
                    ],
                },
                // ... 层内的其他组
                
            ]
        },
        {
            id: 'layer3',
            name: 'Layer 3',
            fill: 'white',
            shapes: [
                {
                    id: 'shape1',
                    name: "Shape 1",
                    type: 'Rect',
                    params: {
                        x: 150,
                        y: 150,
                        width: 50,
                        height: 30,
                        fill: 'green',
                    },
                },
                // ...组内的其他形状
            ],
        },

        // ... 舞台内的其他页面
    ]
   
    
    
};




// canvas.newRender(data);



// import { CanvasComponent } from "./CanvasComponent/index";



