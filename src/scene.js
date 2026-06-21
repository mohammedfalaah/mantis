import * as THREE from 'three';
import { createHardwareMaterial } from './utils/materials';
import { PullHandle } from './products/pullHandle';
import { LeverHandle } from './products/leverHandle';
import { SmartLock } from './products/smartLock';

export class SceneManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    
    this.scrollVelocity = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    
    // Parallax targets
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    
    this.initThree();
    this.initLights();
    this.initEnvironment();
    this.initProducts();
    this.initParticles();
    
    window.addEventListener('resize', this.onResize.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    this.animate(0);
  }
  
  initThree() {
    // 1. Scene - clean white background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#ffffff');
    
    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0, 8);
    
    // 3. Renderer - minimal settings
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.container.appendChild(this.renderer.domElement);
  }
  
  initLights() {
    // Minimal lighting - clean and simple
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.8);
    this.scene.add(this.ambientLight);
    
    // Single soft directional light
    this.keyLight = new THREE.DirectionalLight('#ffffff', 0.8);
    this.keyLight.position.set(2, 3, 3);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.scene.add(this.keyLight);
  }
  
  initEnvironment() {
    // Minimal shadow plane - very subtle
    const floorGeom = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.05 });
    
    this.floorMesh = new THREE.Mesh(floorGeom, floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.y = -3;
    this.floorMesh.receiveShadow = true;
    
    this.scene.add(this.floorMesh);
  }
  
  initProducts() {
    // Shared initial material
    this.activeFinish = 'black';
    this.hardwareMaterial = createHardwareMaterial(this.activeFinish);
    
    // Create product instances
    this.pullHandle = new PullHandle(this.hardwareMaterial);
    this.leverHandle = new LeverHandle(this.hardwareMaterial);
    this.smartLock = new SmartLock(this.hardwareMaterial);
    
    // Group to hold current showing hardware
    this.productsGroup = new THREE.Group();
    this.productsGroup.position.set(0, 0, 0);
    this.scene.add(this.productsGroup);
    
    // Add models to group
    this.productsGroup.add(this.pullHandle.group);
    this.productsGroup.add(this.leverHandle.group);
    this.productsGroup.add(this.smartLock.group);
    
    // Position models in space relative to parent group
    // In view at start: Pull Handle
    this.pullHandle.group.position.set(0, 0, 0);
    this.pullHandle.group.visible = true;
    
    // Out of view: Lever Handle
    this.leverHandle.group.position.set(6, 0, -3);
    this.leverHandle.group.rotation.y = -Math.PI / 4;
    this.leverHandle.group.visible = false;
    
    // Out of view: Smart Lock
    this.smartLock.group.position.set(-6, 0, -3);
    this.smartLock.group.rotation.y = Math.PI / 4;
    this.smartLock.group.visible = false;
  }
  
  initParticles() {
    // Disabled particles for minimalist look
    // this.particles = new MetallicParticles(this.scene, 300);
  }
  
  onResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }
  
  onMouseMove(e) {
    // Normalize coordinates (-1 to 1)
    this.mouseX = (e.clientX / this.width) * 2 - 1;
    this.mouseY = -(e.clientY / this.height) * 2 + 1;
  }
  
  animate(time) {
    requestAnimationFrame(this.animate.bind(this));
    
    const timeSec = time * 0.001;
    
    // Very subtle parallax mouse rotations
    const targetYRot = this.mouseX * 0.08;
    const targetXRot = -this.mouseY * 0.05;
    
    this.productsGroup.rotation.y += (targetYRot - this.productsGroup.rotation.y) * 0.03;
    this.productsGroup.rotation.x += (targetXRot - this.productsGroup.rotation.x) * 0.03;
    
    // Update Smart Lock glows
    if (this.smartLock && this.smartLock.group.visible) {
      this.smartLock.setPulse(timeSec);
    }
    
    // Render
    this.renderer.render(this.scene, this.camera);
  }
  
  updateHardwareFinish(finishKey) {
    this.activeFinish = finishKey;
    
    // Animate material transition
    import('./utils/materials').then(({ transitionMaterialToFinish }) => {
      transitionMaterialToFinish(this.hardwareMaterial, finishKey, 0.8);
    });
  }
}
