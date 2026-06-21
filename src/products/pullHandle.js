import * as THREE from 'three';

export class PullHandle {
  constructor(material) {
    this.material = material;
    this.group = new THREE.Group();
    
    // Create detailed components
    this.createSleeve();
    this.createCore();
    this.createBrackets();
    this.createScrews();
    
    // Scale and position group
    this.group.scale.set(0.9, 0.9, 0.9);
    
    // Keep reference to individual components for animations
    this.components = {
      sleeve: this.sleeveMesh,
      core: this.coreMesh,
      bracketTop: this.bracketTopMesh,
      bracketBottom: this.bracketBottomMesh,
      flangeTop: this.flangeTopMesh,
      flangeBottom: this.flangeBottomMesh,
      screws: this.screwsGroup
    };
  }
  
  createSleeve() {
    // Large elegant vertical square pull handle with rounded edges
    // Main outer sleeve that slides forward during disassembly
    const geom = new THREE.BoxGeometry(0.35, 4.5, 0.25);
    
    // Add micro rounded detail on edges by using an extrude or just bevel simulation
    this.sleeveMesh = new THREE.Mesh(geom, this.material);
    this.sleeveMesh.castShadow = true;
    this.sleeveMesh.receiveShadow = true;
    this.group.add(this.sleeveMesh);
  }
  
  createCore() {
    // Inner high-precision core bar (visible when sleeve slides forward)
    const geom = new THREE.CylinderGeometry(0.12, 0.12, 4.2, 16);
    
    // Use a contrasting slightly darker/rougher metal core (we can tweak properties or keep same)
    // Create steel metal look for core
    this.coreMaterial = new THREE.MeshPhysicalMaterial({
      color: '#444444',
      roughness: 0.35,
      metalness: 0.8,
      clearcoat: 0.1
    });
    
    this.coreMesh = new THREE.Mesh(geom, this.coreMaterial);
    this.coreMesh.castShadow = true;
    this.coreMesh.receiveShadow = true;
    
    // Initially nested perfectly inside the sleeve
    this.coreMesh.position.set(0, 0, 0);
    this.group.add(this.coreMesh);
  }
  
  createBrackets() {
    // Top and Bottom brackets connecting the main pull bar to the door
    const bracketGeom = new THREE.BoxGeometry(0.32, 0.35, 0.6);
    
    this.bracketTopMesh = new THREE.Mesh(bracketGeom, this.material);
    this.bracketTopMesh.position.set(0, 1.6, -0.3);
    this.bracketTopMesh.castShadow = true;
    this.bracketTopMesh.receiveShadow = true;
    this.group.add(this.bracketTopMesh);
    
    this.bracketBottomMesh = new THREE.Mesh(bracketGeom, this.material);
    this.bracketBottomMesh.position.set(0, -1.6, -0.3);
    this.bracketBottomMesh.castShadow = true;
    this.bracketBottomMesh.receiveShadow = true;
    this.group.add(this.bracketBottomMesh);
    
    // Flanges/bases that sit against the wall
    const flangeGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 32);
    flangeGeom.rotateX(Math.PI / 2);
    
    this.flangeTopMesh = new THREE.Mesh(flangeGeom, this.material);
    this.flangeTopMesh.position.set(0, 1.6, -0.6);
    this.flangeTopMesh.castShadow = true;
    this.flangeTopMesh.receiveShadow = true;
    this.group.add(this.flangeTopMesh);
    
    this.flangeBottomMesh = new THREE.Mesh(flangeGeom, this.material);
    this.flangeBottomMesh.position.set(0, -1.6, -0.6);
    this.flangeBottomMesh.castShadow = true;
    this.flangeBottomMesh.receiveShadow = true;
    this.group.add(this.flangeBottomMesh);
  }
  
  createScrews() {
    // Mini hex screws/pins holding brackets together
    this.screwsGroup = new THREE.Group();
    
    const screwGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    screwGeom.rotateZ(Math.PI / 2);
    
    // High-polish silver screw material
    const screwMat = new THREE.MeshPhysicalMaterial({
      color: '#aaaaaa',
      roughness: 0.1,
      metalness: 0.9
    });
    
    this.screwTopL = new THREE.Mesh(screwGeom, screwMat);
    this.screwTopL.position.set(-0.2, 1.6, -0.3);
    
    this.screwTopR = new THREE.Mesh(screwGeom, screwMat);
    this.screwTopR.position.set(0.2, 1.6, -0.3);
    
    this.screwBottomL = new THREE.Mesh(screwGeom, screwMat);
    this.screwBottomL.position.set(-0.2, -1.6, -0.3);
    
    this.screwBottomR = new THREE.Mesh(screwGeom, screwMat);
    this.screwBottomR.position.set(0.2, -1.6, -0.3);
    
    this.screwsGroup.add(this.screwTopL);
    this.screwsGroup.add(this.screwTopR);
    this.screwsGroup.add(this.screwBottomL);
    this.screwsGroup.add(this.screwBottomR);
    
    this.group.add(this.screwsGroup);
  }
  
  updateMaterial(newMaterial) {
    this.material = newMaterial;
    this.sleeveMesh.material = newMaterial;
    this.bracketTopMesh.material = newMaterial;
    this.bracketBottomMesh.material = newMaterial;
    this.flangeTopMesh.material = newMaterial;
    this.flangeBottomMesh.material = newMaterial;
  }
  
  // Explode animation: progress runs from 0.0 (fully closed) to 1.0 (exploded)
  explode(progress) {
    // 1. Sleeve slides straight forward (towards user/Z-axis)
    this.sleeveMesh.position.z = progress * 1.1;
    
    // 2. Core stays slightly recessed (moves backwards slightly along Z-axis)
    this.coreMesh.position.z = progress * -0.3;
    
    // 3. Brackets push outward along Y-axis
    this.bracketTopMesh.position.y = 1.6 + progress * 0.55;
    this.bracketBottomMesh.position.y = -1.6 - progress * 0.55;
    
    // 4. Brackets also pull forward slightly
    this.bracketTopMesh.position.z = -0.3 + progress * 0.2;
    this.bracketBottomMesh.position.z = -0.3 + progress * 0.2;
    
    // 5. Flanges stay locked to wall, but rotate/translate slightly to show mechanical clearance
    this.flangeTopMesh.position.y = 1.6 + progress * 0.1;
    this.flangeBottomMesh.position.y = -1.6 - progress * 0.1;
    this.flangeTopMesh.position.z = -0.6 - progress * 0.15;
    this.flangeBottomMesh.position.z = -0.6 - progress * 0.15;
    
    // 6. Hex screws explode outwards horizontally along X-axis
    this.screwTopL.position.x = -0.2 - progress * 0.6;
    this.screwTopR.position.x = 0.2 + progress * 0.6;
    this.screwBottomL.position.x = -0.2 - progress * 0.6;
    this.screwBottomR.position.x = 0.2 + progress * 0.6;
    
    // Rotations during explosion to give floating organic weightlessness
    this.sleeveMesh.rotation.y = progress * 0.25;
    this.sleeveMesh.rotation.z = progress * 0.05;
  }
}
