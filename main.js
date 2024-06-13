import * as THREE from 'three';
import {AfterimagePass, EffectComposer, RenderPass} from "three/addons";
import {Celestial} from './celestial'


const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();


const s1=new Celestial("s1",2,1,1,0x00ff00,0.1)
let celestials= [];
celestials.push(s1);
console.log(s1)
scene.add( s1.sphere );

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const afterimagePass = new AfterimagePass();
afterimagePass.uniforms.damp.value = 0.65;
composer.addPass(afterimagePass);

camera.position.z = 10;
let t = 0;
const k = 0.1;

function animate() {
    requestAnimationFrame(animate);

    celestials.map(res=>res.run())//every element render in the function
    composer.render(scene, camera);
    // renderer.render(scene, camera);
}

animate();