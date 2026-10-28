import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MemoryItem } from '../types/memory';
import {
  createOakDeskModel,
  createCRTTerminalModel,
  createCandleHolderModel,
  createPocketWatchModel,
  createCassetteModel,
  createUnpostedLetterModel,
  createFloatingMemoryPlanes,
  createSpectralGhostCoreParticles
} from '../three/proceduralModels';
import { createCRTScreenTexture } from '../three/proceduralTextures';
import { getMemoryCategoryType } from '../logic/memoryGraph';
import { soundEngine } from '../audio/ambientSynth';

export type CameraViewPreset = 'midnight_room' | 'terminal_focus' | 'ghost_orbit' | 'keepsakes_zoom';

interface ThreeMemorySceneProps {
  memories: MemoryItem[];
  selectedMemoryId: string | null;
  onSelectMemory: (id: string) => void;
  cameraPreset: CameraViewPreset;
  onInspectObject?: (objectType: string) => void;
}

const CAMERA_PRESETS: Record<CameraViewPreset, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  midnight_room: {
    pos: new THREE.Vector3(0, 2.3, 3.5),
    target: new THREE.Vector3(0, 1.45, 0)
  },
  terminal_focus: {
    pos: new THREE.Vector3(0, 1.62, 1.35),
    target: new THREE.Vector3(0, 1.62, 0.46)
  },
  ghost_orbit: {
    pos: new THREE.Vector3(1.7, 2.2, 2.1),
    target: new THREE.Vector3(0, 1.7, 0)
  },
  keepsakes_zoom: {
    pos: new THREE.Vector3(-0.95, 1.42, 0.95),
    target: new THREE.Vector3(-0.65, 1.02, 0.25)
  }
};

export const ThreeMemoryScene: React.FC<ThreeMemorySceneProps> = ({
  memories,
  selectedMemoryId,
  onSelectMemory,
  cameraPreset,
  onInspectObject
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const selectedMemoryIdRef = useRef(selectedMemoryId);
  selectedMemoryIdRef.current = selectedMemoryId;

  const cameraPresetRef = useRef(cameraPreset);
  cameraPresetRef.current = cameraPreset;

  const onSelectMemoryRef = useRef(onSelectMemory);
  onSelectMemoryRef.current = onSelectMemory;

  const onInspectObjectRef = useRef(onInspectObject);
  onInspectObjectRef.current = onInspectObject;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Scene & Fog Setup (Midnight room ambiance)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0908);
    scene.fog = new THREE.FogExp2(0x0A0908, 0.18);

    // 3. Studio PBR Environment Reflection (RoomEnvironment)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // 4. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    const initialConfig = CAMERA_PRESETS[cameraPresetRef.current];
    camera.position.copy(initialConfig.pos);
    const currentLookTarget = initialConfig.target.clone();
    camera.lookAt(currentLookTarget);

    // 5. Lighting Rig (Warm Key Candle + Cool Hemisphere Fill)
    const hemiLight = new THREE.HemisphereLight(0x3B4252, 0x110F0E, 0.7);
    scene.add(hemiLight);

    const warmKeyLight = new THREE.DirectionalLight(0xFDE68A, 1.2);
    warmKeyLight.position.set(3, 4, 3);
    warmKeyLight.castShadow = !isSoftwareGl;
    if (warmKeyLight.shadow) {
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.camera.near = 0.5;
      warmKeyLight.shadow.camera.far = 12;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
    }
    scene.add(warmKeyLight);

    // 6. Assemble 3D Scene Composites
    // Desk
    const desk = createOakDeskModel();
    scene.add(desk);

    // CRT Terminal
    const selectedMem = memories.find((m) => m.id === selectedMemoryIdRef.current) || memories[0];
    const category = getMemoryCategoryType(selectedMem);
    let screenTex = createCRTScreenTexture(selectedMem.title, category);
    const terminal = createCRTTerminalModel(screenTex);
    terminal.position.set(0, 0, -0.15);
    scene.add(terminal);

    // Candle with flickering PointLight
    const { group: candle, candleLight } = createCandleHolderModel();
    candle.position.set(1.4, 0, 0.3);
    scene.add(candle);

    // Antique Pocket Watch on desk
    const watch = createPocketWatchModel();
    watch.position.set(-0.75, 0, 0.45);
    watch.rotation.y = 0.25;
    scene.add(watch);

    // Microcassette Tape #03 on desk
    const cassette = createCassetteModel();
    cassette.position.set(-0.35, 0, 0.7);
    cassette.rotation.y = -0.15;
    scene.add(cassette);

    // Unposted Letter to Eliza on desk
    const letter = createUnpostedLetterModel();
    letter.position.set(0.65, 0, 0.55);
    letter.rotation.y = -0.1;
    scene.add(letter);

    // Floating 3D Holographic Memory Planes
    const { group: memoryPlanesGroup, memoryMeshes } = createFloatingMemoryPlanes(memories);
    scene.add(memoryPlanesGroup);

    // Central Glowing Spectral Ghost Core Particles
    const { coreGroup: ghostCore, particles: ghostParticles, rings: ghostRings } = createSpectralGhostCoreParticles(category);
    scene.add(ghostCore);

    // Contact Shadows on the floor
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x060504,
      roughness: 0.95,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Raycasting for interactive 3D inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check memory planes
      const intersects = raycaster.intersectObjects(memoryMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.memoryId) {
          soundEngine.playCassetteClick();
          soundEngine.playMemoryRecallChime(440);
          onSelectMemoryRef.current(hit.userData.memoryId);
        }
        return;
      }

      // Check desk props
      const propIntersects = raycaster.intersectObjects([watch, cassette, letter, terminal], true);
      if (propIntersects.length > 0) {
        soundEngine.playCassetteClick();
        let topGroup: THREE.Object3D | null = propIntersects[0].object;
        while (topGroup && topGroup.parent !== scene) {
          topGroup = topGroup.parent;
        }
        if (topGroup?.name.includes('Pocket_Watch')) {
          onSelectMemoryRef.current('mem-1998-01');
          onInspectObjectRef.current?.('pocket_watch');
        } else if (topGroup?.name.includes('Microcassette')) {
          onSelectMemoryRef.current('mem-2008-01');
          onInspectObjectRef.current?.('cassette');
        } else if (topGroup?.name.includes('Letter')) {
          onSelectMemoryRef.current('mem-1994-02');
          onInspectObjectRef.current?.('letter');
        } else if (topGroup?.name.includes('Terminal')) {
          onSelectMemoryRef.current('mem-1994-01');
          onInspectObjectRef.current?.('terminal');
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Smooth Damped Camera Transitions & Software WebGL Pace
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 75);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    let candleFlickerPhase = 0;

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Organic Candle Flame Flicker
      candleFlickerPhase += dt * 8;
      const flicker = Math.sin(candleFlickerPhase) * 0.15 + Math.cos(candleFlickerPhase * 2.3) * 0.1;
      candleLight.intensity = 1.35 + flicker;

      // Slow orbital drift of the central spectral ghost core
      ghostCore.rotation.y = time * 0.15;
      ghostRings.forEach((r, idx) => {
        r.rotation.y = time * (0.08 * (idx % 2 === 0 ? 1 : -1));
      });

      // Memory hologram planes orbital float & subtle bobbing
      memoryMeshes.forEach((mesh, idx) => {
        const baseAngle = (idx / memories.length) * Math.PI * 2;
        const currentAngle = baseAngle + time * 0.05;
        const radius = 1.35 + (idx % 2) * 0.25;
        mesh.position.x = Math.cos(currentAngle) * radius;
        mesh.position.z = Math.sin(currentAngle) * radius;
        mesh.position.y = 1.6 + Math.sin(time * 1.5 + idx) * 0.08;
        mesh.lookAt(0, 1.6, 0);
      });

      // Damped Camera Kinematics (glides toward active preset)
      const targetPreset = CAMERA_PRESETS[cameraPresetRef.current];
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPreset.pos.x, 3.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPreset.pos.y, 3.5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPreset.pos.z, 3.5, dt);

      currentLookTarget.x = THREE.MathUtils.damp(currentLookTarget.x, targetPreset.target.x, 3.5, dt);
      currentLookTarget.y = THREE.MathUtils.damp(currentLookTarget.y, targetPreset.target.y, 3.5, dt);
      currentLookTarget.z = THREE.MathUtils.damp(currentLookTarget.z, targetPreset.target.z, 3.5, dt);
      camera.lookAt(currentLookTarget);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      screenTex.dispose();
    };
  }, [memories]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing z-0"
      data-testid="three-memory-scene-canvas"
    />
  );
};
