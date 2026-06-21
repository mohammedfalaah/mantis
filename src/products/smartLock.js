import * as THREE from 'three';
import { createGlassMaterial, createEmissiveMaterial } from '../utils/materials';

export class SmartLock {
  constructor(material) {
    this.material = material;
    this.group = new THREE.Group();
    
    this.createBasePlate();
    this.createGlassInterface();
    this.createBiometricSensor();
    this.createKeypad();
    this.createCameraLens();
    this.createSmartLever();
    
    // Scale and position group
    this.group.scale.set(1.1, 1.1, 1.1);
  }
  
  createBasePlate() {
    // Tall, modern rectangular base plate with slight thickness
    const baseGeom = new THREE.BoxGeometry(1.0, 4.2, 0.15);
    this.baseMesh = new THREE.Mesh(baseGeom, this.material);
    this.baseMesh.castShadow = true;
    this.baseMesh.receiveShadow = true;
    this.group.add(this.baseMesh);
  }
  
  createGlassInterface() {
    // Premium black glass touch-screen covering the top-half of the faceplate
    const glassGeom = new THREE.BoxGeometry(0.9, 2.0, 0.04);
    this.glassMat = createGlassMaterial();
    
    this.glassMesh = new THREE.Mesh(glassGeom, this.glassMat);
    this.glassMesh.position.set(0, 0.9, 0.09); // Raised slightly on Z
    this.glassMesh.castShadow = true;
    this.group.add(this.glassMesh);
  }
  
  createBiometricSensor() {
    this.biometricGroup = new THREE.Group();
    this.biometricGroup.position.set(0, 1.5, 0.12);
    
    // Outer metal ring
    const ringGeom = new THREE.TorusGeometry(0.16, 0.03, 16, 64);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: '#adbec4', // Silver chrome
      roughness: 0.1,
      metalness: 0.95
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.castShadow = true;
    this.biometricGroup.add(ringMesh);
    
    // Inner scanner surface
    const scannerGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 32);
    scannerGeom.rotateX(Math.PI / 2);
    const scannerMat = new THREE.MeshPhysicalMaterial({
      color: '#0d131a',
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.8
    });
    const scannerMesh = new THREE.Mesh(scannerGeom, scannerMat);
    this.biometricGroup.add(scannerMesh);
    
    // Cyan LED ring light underneath
    const ledGeom = new THREE.TorusGeometry(0.13, 0.008, 8, 48);
    this.ledMaterial = createEmissiveMaterial('#00f0ff', 2.5); // glowing cyan
    
    this.ledMesh = new THREE.Mesh(ledGeom, this.ledMaterial);
    this.ledMesh.position.z = 0.01;
    this.biometricGroup.add(this.ledMesh);
    
    this.group.add(this.biometricGroup);
  }
  
  createKeypad() {
    this.keypadGroup = new THREE.Group();
    this.keypadGroup.position.set(0, 0.8, 0.12); // Under the fingerprint scanner
    
    // Procedural numbers grid (3x4)
    const btnGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16);
    btnGeom.rotateX(Math.PI / 2);
    
    this.keypadLEDMat = createEmissiveMaterial('#00b7ff', 1.5); // softer cyan/blue
    
    const rows = 4;
    const cols = 3;
    const spacingX = 0.22;
    const spacingY = 0.22;
    
    this.keypadLights = [];
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - 1) * spacingX;
        const y = (1.5 - r) * spacingY;
        
        // Single digit indicator dot (representing a backlit key)
        const dot = new THREE.Mesh(btnGeom, this.keypadLEDMat);
        dot.position.set(x, y, 0);
        this.keypadGroup.add(dot);
        this.keypadLights.push(dot);
      }
    }
    
    this.group.add(this.keypadGroup);
  }
  
  createCameraLens() {
    // Camera unit at the top of the interface
    this.cameraGroup = new THREE.Group();
    this.cameraGroup.position.set(0, 1.88, 0.11);
    
    const trimGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 32);
    trimGeom.rotateX(Math.PI / 2);
    const trimMat = new THREE.MeshPhysicalMaterial({ color: '#151515', metalness: 0.8, roughness: 0.2 });
    const trimMesh = new THREE.Mesh(trimGeom, trimMat);
    this.cameraGroup.add(trimMesh);
    
    const lensGeom = new THREE.SphereGeometry(0.045, 32, 32);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: '#02060c',
      roughness: 0.01,
      metalness: 0.9,
      transmission: 0.2,
      ior: 1.7,
      clearcoat: 1.0
    });
    const lensMesh = new THREE.Mesh(lensGeom, lensMat);
    lensMesh.position.z = 0.01;
    this.cameraGroup.add(lensMesh);
    
    this.group.add(this.cameraGroup);
  }
  
  createSmartLever() {
    // Clean, minimalist geometric lever handle on the bottom half
    this.leverGroup = new THREE.Group();
    this.leverGroup.position.set(0, -0.8, 0.08); // Lower half
    
    // Neck mounting collar
    const neckGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 32);
    neckGeom.rotateX(Math.PI / 2);
    neckGeom.translate(0, 0, 0.1);
    const neckMesh = new THREE.Mesh(neckGeom, this.material);
    neckMesh.castShadow = true;
    this.leverGroup.add(neckMesh);
    
    // Minimalist angular block lever
    const leverGeom = new THREE.BoxGeometry(1.6, 0.22, 0.12);
    leverGeom.translate(0.6, 0, 0.22); // Shift axis center to left side
    
    this.leverMesh = new THREE.Mesh(leverGeom, this.material);
    this.leverMesh.castShadow = true;
    this.leverMesh.receiveShadow = true;
    this.leverGroup.add(this.leverMesh);
    
    this.group.add(this.leverGroup);
  }
  
  updateMaterial(newMaterial) {
    this.material = newMaterial;
    this.baseMesh.material = newMaterial;
    this.leverMesh.material = newMaterial;
    this.leverGroup.children[0].material = newMaterial; // Neck
  }
  
  // Set biometric sensor state (active cyan, success green, error red)
  setBiometricState(state) {
    let color = '#00f0ff';
    let intensity = 2.5;
    if (state === 'success') {
      color = '#39ff14'; // neon green
    } else if (state === 'error') {
      color = '#ff073a'; // neon red
    }
    
    this.ledMaterial.color.set(color).multiplyScalar(intensity);
  }
  
  // Animate biometric pulse
  setPulse(time) {
    const intensity = 1.5 + Math.sin(time * 5) * 1.0;
    this.ledMaterial.color.set('#00f0ff').multiplyScalar(intensity);
  }
  
  // Set rotation of the lever handle
  setRotation(angle) {
    this.leverGroup.rotation.z = angle;
  }
}
