import * as THREE from 'three';

// Create a simple circular particle texture procedurally
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Radial gradient for soft glow particle
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  
  return new THREE.CanvasTexture(canvas);
}

export class MetallicParticles {
  constructor(scene, count = 250) {
    this.scene = scene;
    this.count = count;
    this.geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    this.speeds = new Float32Array(count);
    this.angles = new Float32Array(count);
    this.sways = new Float32Array(count);
    
    const colorsList = [
      new THREE.Color('#cca456'), // Gold
      new THREE.Color('#adbec4'), // Silver
      new THREE.Color('#ffffff'), // White highlight
      new THREE.Color('#4a4d50')  // Gunmetal
    ];
    
    for (let i = 0; i < count; i++) {
      // Random position in a wide bounding box around the products
      positions[i * 3] = (Math.random() - 0.5) * 20;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
      
      // Select random color
      const color = colorsList[Math.floor(Math.random() * colorsList.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random speed and angle parameters for drift
      this.speeds[i] = 0.002 + Math.random() * 0.005;
      this.angles[i] = Math.random() * Math.PI * 2;
      this.sways[i] = 0.001 + Math.random() * 0.003;
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    this.material = new THREE.PointsMaterial({
      size: 0.15,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    this.points = new THREE.Points(this.geometry, this.material);
    scene.add(this.points);
  }
  
  update(scrollVelocity = 0, mouseX = 0, mouseY = 0) {
    const posAttr = this.geometry.attributes.position;
    const positions = posAttr.array;
    
    for (let i = 0; i < this.count; i++) {
      // Slow upward drift, accelerated by scroll velocity
      positions[i * 3 + 1] += this.speeds[i] + scrollVelocity * 0.02;
      
      // Horizontal sway (sine wave)
      this.angles[i] += this.sways[i];
      positions[i * 3] += Math.sin(this.angles[i]) * 0.002 + mouseX * 0.0005;
      positions[i * 3 + 2] += Math.cos(this.angles[i]) * 0.001 + mouseY * 0.0005;
      
      // Wrap around Y
      if (positions[i * 3 + 1] > 7.5) {
        positions[i * 3 + 1] = -7.5;
        positions[i * 3] = (Math.random() - 0.5) * 20;
      }
      
      // Wrap around X/Z slightly
      if (positions[i * 3] > 10) positions[i * 3] = -10;
      if (positions[i * 3] < -10) positions[i * 3] = 10;
    }
    
    posAttr.needsUpdate = true;
    
    // Subtle rotation of the entire particle system
    this.points.rotation.y += 0.0003;
  }
}
