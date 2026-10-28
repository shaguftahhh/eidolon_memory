import * as THREE from 'three';
import {
  createWoodDeskTexture,
  createWatchDialTexture,
  createCassetteLabelTexture,
  createLetterPaperTexture
} from './proceduralTextures';
import { MemoryItem } from '../types/memory';

/**
 * Procedural 3D composite models adhering to the Three.js skill:
 * - 3–12 distinct parts per model
 * - Varying roughness and metalness across adjacent parts
 * - Grounded bottom-center pivots
 */

export function createOakDeskModel(): THREE.Group {
  const deskGroup = new THREE.Group();
  deskGroup.name = 'Desk_Composite';

  const woodTex = createWoodDeskTexture();

  const deskMat = new THREE.MeshStandardMaterial({
    map: woodTex,
    roughness: 0.75,
    metalness: 0.1
  });

  const brassTrimMat = new THREE.MeshStandardMaterial({
    color: 0x967332,
    roughness: 0.35,
    metalness: 0.85
  });

  // 1. Desktop surface slab (Primary silhouette)
  const topGeo = new THREE.BoxGeometry(4.2, 0.14, 2.6);
  const topMesh = new THREE.Mesh(topGeo, deskMat);
  topMesh.position.set(0, 0.93, 0);
  topMesh.receiveShadow = true;
  deskGroup.add(topMesh);

  // 2. Beveled brass perimeter trim (Accent detail)
  const trimGeo = new THREE.BoxGeometry(4.24, 0.04, 2.64);
  const trimMesh = new THREE.Mesh(trimGeo, brassTrimMat);
  trimMesh.position.set(0, 0.94, 0);
  deskGroup.add(trimMesh);

  // 3-6. Four sturdy wooden desk legs (Secondary read)
  const legGeo = new THREE.CylinderGeometry(0.065, 0.045, 0.93, 16);
  const legPositions = [
    [-1.9, 0.465, -1.1],
    [1.9, 0.465, -1.1],
    [-1.9, 0.465, 1.1],
    [1.9, 0.465, 1.1]
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, deskMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    deskGroup.add(leg);

    // Brass leg foot (Accent)
    const footGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.06, 16);
    const foot = new THREE.Mesh(footGeo, brassTrimMat);
    foot.position.set(x, 0.03, z);
    deskGroup.add(foot);
  });

  return deskGroup;
}

export function createCRTTerminalModel(screenTex: THREE.CanvasTexture): THREE.Group {
  const terminal = new THREE.Group();
  terminal.name = 'CRT_Terminal_Composite';

  // Materials with varied roughness & metalness
  const casingMat = new THREE.MeshStandardMaterial({
    color: 0x2A2521, // Charcoal vintage plastic
    roughness: 0.55,
    metalness: 0.2
  });

  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x1A1715,
    roughness: 0.85,
    metalness: 0.1
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissive: 0x3A2A1A,
    emissiveMap: screenTex,
    emissiveIntensity: 0.95,
    roughness: 0.15,
    metalness: 0.1
  });

  const keyboardMat = new THREE.MeshStandardMaterial({
    color: 0x24201D,
    roughness: 0.65,
    metalness: 0.15
  });

  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x362E28,
    roughness: 0.45,
    metalness: 0.2
  });

  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    emissive: 0xF59E0B,
    emissiveIntensity: 2.0,
    roughness: 0.1,
    metalness: 0.8
  });

  // 1. Monitor Body Housing (Primary silhouette)
  const monitorGeo = new THREE.BoxGeometry(1.2, 0.95, 0.85);
  const monitor = new THREE.Mesh(monitorGeo, casingMat);
  monitor.position.set(0, 1.62, 0);
  monitor.castShadow = true;
  terminal.add(monitor);

  // 2. Beveled Front Bezel (Secondary read)
  const bezelGeo = new THREE.BoxGeometry(1.12, 0.86, 0.06);
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.set(0, 1.62, 0.43);
  terminal.add(bezel);

  // 3. CRT Screen Curvature (Curved plane)
  const screenGeo = new THREE.PlaneGeometry(0.96, 0.72, 8, 8);
  // Give slight convex bulging to CRT screen
  const pos = screenGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const distSq = x * x + y * y;
    pos.setZ(i, -distSq * 0.08);
  }
  screenGeo.computeVertexNormals();

  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.62, 0.465);
  screen.name = 'CRT_Screen_Mesh';
  terminal.add(screen);

  // 4. Stand Neck & Swivel Base (Secondary read)
  const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.22, 16);
  const neck = new THREE.Mesh(neckGeo, casingMat);
  neck.position.set(0, 1.08, 0);
  terminal.add(neck);

  const standBaseGeo = new THREE.BoxGeometry(0.7, 0.06, 0.65);
  const standBase = new THREE.Mesh(standBaseGeo, bezelMat);
  standBase.position.set(0, 1.01, 0);
  standBase.receiveShadow = true;
  terminal.add(standBase);

  // 5. Vintage Mechanical Keyboard Chassis (Secondary read)
  const kbChassisGeo = new THREE.BoxGeometry(1.05, 0.05, 0.42);
  const kbChassis = new THREE.Mesh(kbChassisGeo, keyboardMat);
  kbChassis.position.set(0, 1.03, 0.7);
  kbChassis.rotation.x = 0.08;
  kbChassis.castShadow = true;
  terminal.add(kbChassis);

  // 6. Keyboard Key Blocks (Accent detail)
  const keyBlockGeo = new THREE.BoxGeometry(0.95, 0.03, 0.32);
  const keyBlock = new THREE.Mesh(keyBlockGeo, keyMat);
  keyBlock.position.set(0, 1.06, 0.7);
  keyBlock.rotation.x = 0.08;
  terminal.add(keyBlock);

  // 7. Amber Status LED (Accent detail)
  const ledGeo = new THREE.SphereGeometry(0.015, 12, 12);
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.48, 1.25, 0.45);
  terminal.add(led);

  // 8. Back Ventilation Slots (Accent detail)
  const ventGeo = new THREE.BoxGeometry(0.8, 0.25, 0.02);
  const vent = new THREE.Mesh(ventGeo, bezelMat);
  vent.position.set(0, 1.7, -0.43);
  terminal.add(vent);

  return terminal;
}

export function createCandleHolderModel(): { group: THREE.Group; candleLight: THREE.PointLight } {
  const group = new THREE.Group();
  group.name = 'CandleHolder_Composite';

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x8C6826,
    roughness: 0.35,
    metalness: 0.85
  });

  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xFAF1E0,
    roughness: 0.9,
    metalness: 0.05
  });

  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x1A1715,
    roughness: 0.95
  });

  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xF59E0B
  });

  // 1. Candlestick Saucer (LatheGeometry)
  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.24, 0));
  points.push(new THREE.Vector2(0.24, 0.03));
  points.push(new THREE.Vector2(0.08, 0.04));
  points.push(new THREE.Vector2(0.07, 0.12));
  points.push(new THREE.Vector2(0.09, 0.14));
  points.push(new THREE.Vector2(0.06, 0.14));
  points.push(new THREE.Vector2(0.06, 0.04));
  const saucerGeo = new THREE.LatheGeometry(points, 24);
  const saucer = new THREE.Mesh(saucerGeo, brassMat);
  saucer.position.set(0, 1.0, 0);
  saucer.castShadow = true;
  group.add(saucer);

  // 2. Brass Finger Loop Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 12, 24, Math.PI * 1.5);
  const handle = new THREE.Mesh(handleGeo, brassMat);
  handle.position.set(0.22, 1.06, 0);
  handle.rotation.z = Math.PI / 4;
  group.add(handle);

  // 3. Wax Candle Column
  const waxGeo = new THREE.CylinderGeometry(0.045, 0.048, 0.32, 16);
  const wax = new THREE.Mesh(waxGeo, waxMat);
  wax.position.set(0, 1.25, 0);
  wax.castShadow = true;
  group.add(wax);

  // 4. Melted Wax Drip Rim
  const dripGeo = new THREE.TorusGeometry(0.048, 0.01, 12, 16);
  const drip = new THREE.Mesh(dripGeo, waxMat);
  drip.position.set(0, 1.39, 0);
  group.add(drip);

  // 5. Darkened Wick
  const wickGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.04, 8);
  const wick = new THREE.Mesh(wickGeo, wickMat);
  wick.position.set(0, 1.42, 0);
  group.add(wick);

  // 6. Glowing Flame Shape
  const flameGeo = new THREE.ConeGeometry(0.02, 0.06, 12);
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.set(0, 1.46, 0);
  group.add(flame);

  // Real Candle Light Casting Warm Shadows
  const candleLight = new THREE.PointLight(0xF59E0B, 1.4, 4.5);
  candleLight.position.set(0, 1.48, 0);
  candleLight.castShadow = true;
  candleLight.shadow.bias = -0.001;
  candleLight.shadow.mapSize.width = 512;
  candleLight.shadow.mapSize.height = 512;
  group.add(candleLight);

  return { group, candleLight };
}

export function createPocketWatchModel(): THREE.Group {
  const watch = new THREE.Group();
  watch.name = 'Antique_Pocket_Watch';

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xC49A45,
    roughness: 0.3,
    metalness: 0.85
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.8,
    transparent: true,
    opacity: 0.85,
    ior: 1.5
  });

  const dialTex = createWatchDialTexture();
  const dialMat = new THREE.MeshStandardMaterial({
    map: dialTex,
    roughness: 0.45,
    metalness: 0.15
  });

  // 1. Brass Watch Case Body (Primary silhouette)
  const caseGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32);
  const caseMesh = new THREE.Mesh(caseGeo, brassMat);
  caseMesh.position.set(0, 1.02, 0);
  caseMesh.castShadow = true;
  watch.add(caseMesh);

  // 2. Dial Face with stopped hands at 7:42
  const dialGeo = new THREE.CircleGeometry(0.165, 32);
  const dial = new THREE.Mesh(dialGeo, dialMat);
  dial.rotation.x = -Math.PI / 2;
  dial.position.set(0, 1.041, 0);
  watch.add(dial);

  // 3. Beveled Watch Glass Crystal
  const glassGeo = new THREE.CylinderGeometry(0.168, 0.168, 0.008, 32);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 1.045, 0);
  watch.add(glass);

  // 4. Winding Crown & Stem (Accent detail)
  const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.05, 12);
  const stem = new THREE.Mesh(stemGeo, brassMat);
  stem.position.set(0, 1.02, -0.2);
  stem.rotation.x = Math.PI / 2;
  watch.add(stem);

  const crownGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16);
  const crown = new THREE.Mesh(crownGeo, brassMat);
  crown.position.set(0, 1.02, -0.23);
  crown.rotation.x = Math.PI / 2;
  watch.add(crown);

  // 5. Suspension Ring Loop
  const ringGeo = new THREE.TorusGeometry(0.04, 0.008, 12, 24);
  const ring = new THREE.Mesh(ringGeo, brassMat);
  ring.position.set(0, 1.02, -0.26);
  ring.rotation.y = Math.PI / 2;
  watch.add(ring);

  // 6. Linked Chain curve
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.02, -0.26),
    new THREE.Vector3(0.15, 1.01, -0.22),
    new THREE.Vector3(0.3, 1.01, -0.12),
    new THREE.Vector3(0.42, 1.01, 0.05)
  ]);
  const chainGeo = new THREE.TubeGeometry(curve, 32, 0.005, 8, false);
  const chain = new THREE.Mesh(chainGeo, brassMat);
  watch.add(chain);

  return watch;
}

export function createCassetteModel(): THREE.Group {
  const cassette = new THREE.Group();
  cassette.name = 'Microcassette_Composite';

  const shellMat = new THREE.MeshStandardMaterial({
    color: 0x1E1B18,
    roughness: 0.45,
    metalness: 0.3
  });

  const reelMat = new THREE.MeshStandardMaterial({
    color: 0xE2D8C6,
    roughness: 0.6,
    metalness: 0.1
  });

  const labelTex = createCassetteLabelTexture();
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.7,
    metalness: 0.05
  });

  // 1. Plastic Cassette Shell (Primary silhouette)
  const shellGeo = new THREE.BoxGeometry(0.36, 0.025, 0.24);
  const shell = new THREE.Mesh(shellGeo, shellMat);
  shell.position.set(0, 1.015, 0);
  shell.castShadow = true;
  cassette.add(shell);

  // 2. Paper Label (Secondary read)
  const labelGeo = new THREE.PlaneGeometry(0.32, 0.18);
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.rotation.x = -Math.PI / 2;
  label.position.set(0, 1.029, 0);
  cassette.add(label);

  // 3-4. Two White Tape Spools
  const spoolGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.027, 16);
  const spool1 = new THREE.Mesh(spoolGeo, reelMat);
  spool1.position.set(-0.08, 1.015, 0);
  cassette.add(spool1);

  const spool2 = new THREE.Mesh(spoolGeo, reelMat);
  spool2.position.set(0.08, 1.015, 0);
  cassette.add(spool2);

  return cassette;
}

export function createUnpostedLetterModel(): THREE.Group {
  const letter = new THREE.Group();
  letter.name = 'Unposted_Letter_Composite';

  const letterTex = createLetterPaperTexture();
  const paperMat = new THREE.MeshStandardMaterial({
    map: letterTex,
    roughness: 0.85,
    metalness: 0.05
  });

  // Parchment page slightly angled on desk
  const paperGeo = new THREE.PlaneGeometry(0.42, 0.42);
  const paper = new THREE.Mesh(paperGeo, paperMat);
  paper.rotation.x = -Math.PI / 2;
  paper.position.set(0, 1.005, 0);
  paper.receiveShadow = true;
  letter.add(paper);

  // Vintage Fountain Pen next to the letter
  const penMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.2,
    metalness: 0.8
  });
  const penGoldMat = new THREE.MeshStandardMaterial({
    color: 0xCCA040,
    roughness: 0.3,
    metalness: 0.9
  });

  const penBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.34, 12), penMat);
  penBarrel.rotation.z = Math.PI / 2;
  penBarrel.rotation.y = 0.3;
  penBarrel.position.set(0.28, 1.015, 0.1);
  penBarrel.castShadow = true;
  letter.add(penBarrel);

  const nib = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.03, 12), penGoldMat);
  nib.rotation.z = -Math.PI / 2;
  nib.position.set(0.1, 1.015, 0.045);
  letter.add(nib);

  return letter;
}

export function createFloatingMemoryPlanes(memories: MemoryItem[]): {
  group: THREE.Group;
  memoryMeshes: THREE.Mesh[];
} {
  const group = new THREE.Group();
  group.name = 'Floating_Memory_Holograms';
  const memoryMeshes: THREE.Mesh[] = [];

  const textureLoader = new THREE.TextureLoader();

  memories.forEach((mem, idx) => {
    const angle = (idx / memories.length) * Math.PI * 2;
    const radius = 1.35 + (idx % 2) * 0.25;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 1.6 + Math.sin(idx * 1.5) * 0.25;

    // Create plane with image if available, or textured archival canvas
    const planeGeo = new THREE.PlaneGeometry(0.48, 0.36);

    let mat: THREE.Material;
    if (mem.imagePath) {
      const tex = textureLoader.load(mem.imagePath);
      tex.colorSpace = THREE.SRGBColorSpace;
      mat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        opacity: 0.88,
        roughness: 0.4,
        metalness: 0.2,
        side: THREE.DoubleSide
      });
    } else {
      // Procedural fallback
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 192;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#181410';
      ctx.fillRect(0, 0, 256, 192);
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(mem.code, 16, 30);
      ctx.fillStyle = '#EDE4D1';
      ctx.font = 'italic 14px serif';
      ctx.fillText(mem.title, 16, 70);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#8B8275';
      ctx.fillText(`Year ${mem.year} • ${mem.medium}`, 16, 110);

      const canvasTex = new THREE.CanvasTexture(canvas);
      canvasTex.colorSpace = THREE.SRGBColorSpace;
      mat = new THREE.MeshStandardMaterial({
        map: canvasTex,
        transparent: true,
        opacity: 0.85,
        roughness: 0.4,
        side: THREE.DoubleSide
      });
    }

    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 1.6, 0); // Face the central memory core
    mesh.userData = { memoryId: mem.id, title: mem.title, year: mem.year };
    mesh.name = `MemoryCard_${mem.id}`;

    // Luminous amber/blue border frame
    const frameGeo = new THREE.EdgesGeometry(planeGeo);
    const frameMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.65
    });
    const frame = new THREE.LineSegments(frameGeo, frameMat);
    mesh.add(frame);

    memoryMeshes.push(mesh);
    group.add(mesh);
  });

  return { group, memoryMeshes };
}

export function createSpectralGhostCoreParticles(category: 'historical' | 'modern' | 'transitional'): {
  coreGroup: THREE.Group;
  particles: THREE.Points;
  rings: THREE.Line[];
} {
  const coreGroup = new THREE.Group();
  coreGroup.name = 'Spectral_Memory_Ghost_Core';
  coreGroup.position.set(0, 1.7, 0);

  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const isModern = category === 'modern';

  // Base colors
  const primaryR = isModern ? 0.22 : 0.96;
  const primaryG = isModern ? 0.74 : 0.62;
  const primaryB = isModern ? 0.97 : 0.15;

  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = Math.pow(Math.random(), 0.6) * 0.75;

    // Distribute into a subtle spectral cowl / silhouette shape
    const yBias = (Math.random() - 0.45) * 0.8;
    positions[idx] = r * Math.sin(phi) * Math.cos(theta) * 0.65;
    positions[idx + 1] = r * Math.cos(phi) * 0.85 + yBias;
    positions[idx + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.65;

    // Subtle gradient tint
    const tint = Math.random() * 0.3;
    colors[idx] = Math.min(1, primaryR + tint);
    colors[idx + 1] = Math.min(1, primaryG + tint);
    colors[idx + 2] = Math.min(1, primaryB + tint);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.022,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geo, mat);
  coreGroup.add(particles);

  // Concentric Luminous Archival Orbit Rings
  const rings: THREE.Line[] = [];
  const ringRadii = [0.45, 0.75, 1.05];
  ringRadii.forEach((rad, rIdx) => {
    const ringGeo = new THREE.BufferGeometry();
    const segs = 64;
    const rPos = new Float32Array((segs + 1) * 3);
    for (let s = 0; s <= segs; s++) {
      const a = (s / segs) * Math.PI * 2;
      rPos[s * 3] = Math.cos(a) * rad;
      rPos[s * 3 + 1] = 0;
      rPos[s * 3 + 2] = Math.sin(a) * rad;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));

    const ringMat = new THREE.LineBasicMaterial({
      color: isModern ? 0x38BDF8 : 0xF59E0B,
      transparent: true,
      opacity: 0.25 - rIdx * 0.05
    });

    const ringLine = new THREE.Line(ringGeo, ringMat);
    ringLine.rotation.x = Math.PI / 10 * (rIdx % 2 === 0 ? 1 : -1);
    ringLine.rotation.z = Math.PI / 12 * (rIdx % 2 === 0 ? -1 : 1);
    rings.push(ringLine);
    coreGroup.add(ringLine);
  });

  return { coreGroup, particles, rings };
}
