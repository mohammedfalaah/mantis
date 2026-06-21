import * as THREE from 'three';

export class LeverHandle {
  constructor(material) {
    this.material = material;
    this.group = new THREE.Group();
    
    this.createBackplate();
    this.createLever();
    this.createScrews();
    
    // Scale and position group
    this.group.scale.set(1.2, 1.2, 1.2);
  }
  
  createBackplate() {
    // We will build a backplate with a keyhole using THREE.Shape & THREE.ExtrudeGeometry
    const width = 0.8;
    const height = 3.2;
    const radius = 0.15;
    
    const shape = new THREE.Shape();
    
    // Draw a rounded rectangle shape
    shape.moveTo(-width/2 + radius, -height/2);
    shape.lineTo(width/2 - radius, -height/2);
    shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
    shape.lineTo(width/2, height/2 - radius);
    shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
    shape.lineTo(-width/2 + radius, height/2);
    shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
    shape.lineTo(-width/2, -height/2 + radius);
    shape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);
    
    // Create the keyhole cutout as a hole inside the shape
    const keyholePath = new THREE.Path();
    const keyholeY = -0.6; // Position in lower part of backplate
    
    // Circle at the top of the keyhole
    const circleRadius = 0.12;
    keyholePath.moveTo(0, keyholeY + circleRadius);
    keyholePath.absarc(0, keyholeY, circleRadius, Math.PI / 2, Math.PI * 2.5, false);
    
    // Bottom trapezoid flare of the keyhole
    keyholePath.lineTo(0.08, keyholeY);
    keyholePath.lineTo(0.12, keyholeY - 0.35);
    keyholePath.lineTo(-0.12, keyholeY - 0.35);
    keyholePath.lineTo(-0.08, keyholeY);
    keyholePath.closePath();
    
    shape.holes.push(keyholePath);
    
    // Extrude options
    const extrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 4
    };
    
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center geometry but keep origin correct
    geom.center();
    
    this.backplateMesh = new THREE.Mesh(geom, this.material);
    this.backplateMesh.castShadow = true;
    this.backplateMesh.receiveShadow = true;
    this.group.add(this.backplateMesh);
  }
  
  createLever() {
    this.leverGroup = new THREE.Group();
    this.leverGroup.position.set(0, 0.7, 0.08); // Lever sits on the top portion of backplate
    
    // 1. Lever neck (cylinder extending out)
    const neckGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 32);
    neckGeom.rotateX(Math.PI / 2); // Extend along Z
    neckGeom.translate(0, 0, 0.15); // Offset along Z
    
    this.neckMesh = new THREE.Mesh(neckGeom, this.material);
    this.neckMesh.castShadow = true;
    this.neckMesh.receiveShadow = true;
    this.leverGroup.add(this.neckMesh);
    
    // 2. Lever main handle arm (sleek wing shape extending horizontally)
    const leverShape = new THREE.Shape();
    // Profile of ergonomic lever arm
    leverShape.moveTo(0, 0.18);
    leverShape.quadraticCurveTo(0.2, 0.18, 0.4, 0.14);
    leverShape.lineTo(1.8, 0.04);
    leverShape.quadraticCurveTo(1.95, 0, 1.8, -0.06);
    leverShape.lineTo(0.3, -0.16);
    leverShape.quadraticCurveTo(0, -0.18, -0.15, -0.08);
    leverShape.quadraticCurveTo(-0.25, 0, -0.15, 0.12);
    leverShape.closePath();
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.02,
      bevelSegments: 3
    };
    
    const armGeom = new THREE.ExtrudeGeometry(leverShape, extrudeSettings);
    armGeom.translate(0, 0, 0.32); // Offset to sit on front of neck
    
    this.armMesh = new THREE.Mesh(armGeom, this.material);
    this.armMesh.castShadow = true;
    this.armMesh.receiveShadow = true;
    this.leverGroup.add(this.armMesh);
    
    this.group.add(this.leverGroup);
  }
  
  createScrews() {
    // Four countersunk mounting screws (top-left, top-right, bottom-left, bottom-right)
    this.screws = [];
    const screwGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 12);
    screwGeom.rotateX(Math.PI / 2);
    
    const screwMat = new THREE.MeshPhysicalMaterial({
      color: '#888888',
      roughness: 0.3,
      metalness: 0.8
    });
    
    const screwPositions = [
      [-0.25, 1.35, 0.08],
      [0.25, 1.35, 0.08],
      [-0.25, -1.35, 0.08],
      [0.25, -1.35, 0.08]
    ];
    
    screwPositions.forEach(pos => {
      const screw = new THREE.Mesh(screwGeom, screwMat);
      screw.position.set(pos[0], pos[1], pos[2]);
      this.group.add(screw);
      this.screws.push(screw);
    });
  }
  
  updateMaterial(newMaterial) {
    this.material = newMaterial;
    this.backplateMesh.material = newMaterial;
    this.neckMesh.material = newMaterial;
    this.armMesh.material = newMaterial;
  }
  
  // Set rotation angle of the lever arm (e.g. to test latch mechanism)
  // angle is in radians
  setRotation(angle) {
    this.leverGroup.rotation.z = angle;
  }
  
  // Custom interaction animation triggers
  animateInteract() {
    // Press handle down and snap back
    const tl = THREE.MathUtils.clamp; // just utility
    const originalRot = this.leverGroup.rotation.z;
  }
}
