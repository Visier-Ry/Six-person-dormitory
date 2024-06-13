import * as THREE from "three";
import {Celestial} from './celestial'
import {AfterimagePass, EffectComposer, RenderPass} from "three/addons";


const scene = new THREE.Scene();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const afterimagePass = new AfterimagePass();
afterimagePass.uniforms.damp.value = 0.65;
composer.addPass(afterimagePass);
camera.position.z = 10;

let celestials = [];
const text = ['垃', '圾', '全', '英', '班', '9', '号']
// const s1 = new Celestial("none", 2, 1, 1, 0x00ff00, 0.1, "垃圾")
text.map((res, index) => {
    celestials.push(new Celestial('none', 2, 1, 1, 0x00ff00, 0.1, res, index));
})
celestials.map(res => {
    scene.add(res.sphere)
});
// celestials.push(s1);
// console.log(s1)
// let mesh = s1.sphere;
// scene.add(mesh);


// 添加鼠标点击事件监听器
window.addEventListener('click', onMouseClick, false);

function shock(emm) {
    if (emm.isflushing === true) return; // 如果正在刷新，则直接返回
    emm.isflushing = true; // 设置正在刷新的标记
    emm.scale.y = -1;
    emm.scale.x = -1;
    let t = 0;
    let intervalId = setInterval(() => {
        emm.rotation.x = Math.PI + Math.PI / 4 * Math.exp(-0.5 * Math.PI * t) * Math.cos(3 * Math.PI * t); // 使用 Math.exp 而不是 Math.E
        t += 0.01;
        if (t >= 10 || Math.exp(-0.5 * Math.PI * t) < 0.01) {
            clearInterval(intervalId); // 清除定时器
            emm.rotation.x = Math.PI;
            console.log('finish');
            emm.isflushing = false; // 动画完成后设置 isflushing 为 false
        }
    }, 10); // 这里的10表示每隔10毫秒执行一次回调
}

function shockAll(time) {
    let curID = 0;
    let interval = setInterval(() => {
        if (curID === celestials.length) clearInterval(interval)
        shock(celestials[curID].sphere)
        curID++;
    }, time);

}

function onMouseClick(event) {
    // 计算鼠标在标准化设备坐标中的位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // 更新射线投射器并投射射线
    raycaster.setFromCamera(mouse, camera);
    // 计算与射线的物体相交
    var intersects = raycaster.intersectObjects(scene.children);
    // 遍历相交数组，并检查是否有模型被点击
    for (var i = 0; i < intersects.length; i++) {
        shockAll(50);
    }
}

// ... 其他three.js代码 ...

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    // s1.run();
    renderer.render(scene, camera);
}

animate();