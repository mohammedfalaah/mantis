import * as THREE from 'three';
import { gsap } from 'gsap';

// Procedural Brushed Metal Grain Texture Generator
function createBrushedMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);
  
  // Draw fine horizontal streaks
  for (let i = 0; i < 15000; i++) {
    const y = Math.random() * 512;
    const x = Math.random() * 512;
    const length = 50 + Math.random() * 100;
    const opacity = 0.02 + Math.random() * 0.08;
    const brightness = Math.random() > 0.5 ? 255 : 0;
    
    ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.stroke();
    
    // Wrap around for seamless tiling
    if (x + length > 512) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo((x + length) - 512, y);
      ctx.stroke();
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Global texture reference
const brushedTexture = createBrushedMetalTexture();

// Finish Definitions with PBR properties
export const FINISH_SPECS = {
  black: {
    color: '#121212',
    roughness: 0.75,
    metalness: 0.15,
    clearcoat: 0.05,
    clearcoatRoughness: 0.2,
    reflectivity: 0.3,
    bumpScale: 0.001,
    name: 'Matte Black Electrostatic',
    base: 'High-Tensile Zinc Alloy',
    coating: 'Powder-coated electrostatic finish, scratch-resistant to 9H.'
  },
  steel: {
    color: '#adbec4',
    roughness: 0.25,
    metalness: 0.95,
    clearcoat: 0.15,
    clearcoatRoughness: 0.25,
    reflectivity: 0.9,
    bumpScale: 0.008,
    name: 'Satin Brushed Steel',
    base: '316L Marine Stainless Steel',
    coating: 'Fine-grain satin brushed texture, anti-fingerprint coating.'
  },
  gold: {
    color: '#cca456',
    roughness: 0.3,
    metalness: 0.9,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
    reflectivity: 0.95,
    bumpScale: 0.004,
    name: '24K Antique Gold PVD',
    base: 'Forged Architectural Brass',
    coating: 'Physical Vapor Deposition (PVD) titanium gold molecular bond.'
  },
  gunmetal: {
    color: '#3c3f42',
    roughness: 0.2,
    metalness: 0.88,
    clearcoat: 0.4,
    clearcoatRoughness: 0.1,
    reflectivity: 0.8,
    bumpScale: 0.006,
    name: 'Obsidian Gunmetal',
    base: 'Aircraft-grade 6061 Aluminum',
    coating: 'Anodized volcanic gunmetal finish with micro-polished highlights.'
  }
};

// Core Material Creator
export function createHardwareMaterial(finishKey = 'black') {
  const spec = FINISH_SPECS[finishKey] || FINISH_SPECS.black;
  
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(spec.color),
    roughness: spec.roughness,
    metalness: spec.metalness,
    clearcoat: spec.clearcoat,
    clearcoatRoughness: spec.clearcoatRoughness,
    reflectivity: spec.reflectivity,
    bumpMap: brushedTexture,
    bumpScale: spec.bumpScale,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });
}

// Special Glass Material for Smart Lock Screen/Keypad
export function createGlassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: '#08080c',
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.6,
    thickness: 1.5,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.95
  });
}

// UI Glowing Materials
export function createEmissiveMaterial(color = '#00ffff', intensity = 2) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(intensity),
    toneMapped: false
  });
}

// Ground Reflection Material
export function createGroundMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.15,
    metalness: 0.8,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9
  });
}

// Smooth Transition Between Finishes
export function transitionMaterialToFinish(material, finishKey, duration = 1.0) {
  const spec = FINISH_SPECS[finishKey];
  if (!spec || !material) return;
  
  const targetColor = new THREE.Color(spec.color);
  
  // Use GSAP to animate material properties
  gsap.to(material.color, {
    r: targetColor.r,
    g: targetColor.g,
    b: targetColor.b,
    duration: duration,
    ease: 'power2.out'
  });
  
  gsap.to(material, {
    roughness: spec.roughness,
    metalness: spec.metalness,
    clearcoat: spec.clearcoat,
    clearcoatRoughness: spec.clearcoatRoughness,
    bumpScale: spec.bumpScale,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      material.needsUpdate = true;
    }
  });
}
