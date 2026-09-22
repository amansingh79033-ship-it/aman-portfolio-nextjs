"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface MemoryHoloProps {
  compactionActive?: boolean;
  isolationLevel?: "strict" | "shared" | "compacted";
  className?: string;
  onLayerClick?: (layer: string, details: string) => void;
}

const MEMORY_STRATA = [
  { name: "L1: Ephemeral Task Scratchpad", role: "Isolated per-agent RAM, zero state leakage", color: 0x5eead4 },
  { name: "L2: Rolling Delta Compactor", role: "Synthesizes multi-turn conversations into lossless state diffs", color: 0x8b7cf6 },
  { name: "L3: Persistent Graph Knowledge", role: "Cross-session vector-graph durable facts", color: 0x38bdf8 },
];

export default function MemoryHoloLayers3D({
  compactionActive = false,
  isolationLevel = "strict",
  className = "",
  onLayerClick,
}: MemoryHoloProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Concentric Crystalline Rings & Cylinders
    const strataMeshes: THREE.Mesh[] = [];

    MEMORY_STRATA.forEach((strata, idx) => {
      const radius = 1.3 + idx * 1.1;
      const ringGeo = new THREE.TorusGeometry(radius, 0.06, 16, 60);
      const ringMat = new THREE.MeshBasicMaterial({
        color: strata.color,
        wireframe: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + idx * 0.2;
      ring.rotation.y = idx * 0.4;
      ring.userData = { name: strata.name, role: strata.role };
      group.add(ring);
      strataMeshes.push(ring);

      // Inner Wireframe Shell
      const sphereGeo = new THREE.IcosahedronGeometry(radius * 0.95, 1);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: strata.color,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);
    });

    // Central Zero-Leak Core Cube
    const coreGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
    });
    const coreCube = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreCube);

    // Compacting Token Particles
    const tokenCount = 100;
    const tokenGeo = new THREE.BufferGeometry();
    const tokenPos = new Float32Array(tokenCount * 3);
    const tokenRadii = new Float32Array(tokenCount);
    const tokenSpeeds = new Float32Array(tokenCount);
    const tokenAngles = new Float32Array(tokenCount);

    for (let i = 0; i < tokenCount; i++) {
      const r = 0.8 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      tokenRadii[i] = r;
      tokenAngles[i] = angle;
      tokenSpeeds[i] = (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1);
      tokenPos[i * 3] = Math.cos(angle) * r;
      tokenPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      tokenPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    tokenGeo.setAttribute("position", new THREE.BufferAttribute(tokenPos, 3));
    const tokenMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
    });
    const tokenPoints = new THREE.Points(tokenGeo, tokenMat);
    group.add(tokenPoints);

    // Drag interaction
    let dragging = false;
    let prevX = 0;
    let prevY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      group.rotation.y += dx * 0.003;
      group.rotation.x += dy * 0.003;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onClick = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(strataMeshes);
      if (hits.length > 0) {
        const u = hits[0].object.userData;
        onLayerClick?.(u.name, u.role);
      }
    };

    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointerup", onClick);

    let raf = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!dragging && !reduceMotion) {
        group.rotation.y += 0.002;
        group.rotation.z += 0.001;
      }

      coreCube.rotation.x += 0.01;
      coreCube.rotation.y += 0.012;

      strataMeshes.forEach((mesh, idx) => {
        mesh.rotation.z += (idx % 2 === 0 ? 0.004 : -0.004);
      });

      // Compacting swirl effect
      const pos = tokenGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < tokenCount; i++) {
        tokenAngles[i] += tokenSpeeds[i];
        const r = compactionActive ? Math.max(0.6, tokenRadii[i] * 0.6) : tokenRadii[i];
        pos[i * 3] = Math.cos(tokenAngles[i]) * r;
        pos[i * 3 + 2] = Math.sin(tokenAngles[i]) * r;
      }
      tokenGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerup", onClick);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [compactionActive, isolationLevel, onLayerClick]);

  return <div ref={mountRef} className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`} />;
}
