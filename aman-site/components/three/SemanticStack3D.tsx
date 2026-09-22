"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SemanticStackProps {
  currentStage?: number; // 0: Prompt IR, 1: Semantic AST, 2: Speculative Graph, 3: Formal Gate, 4: Commit
  isRollbackActive?: boolean;
  className?: string;
  onLayerSelect?: (layerName: string, desc: string) => void;
}

const LAYERS = [
  { name: "Layer 0: Natural Intent Parser", desc: "Extracts goal primitives and bounds search horizon", color: 0x5eead4 },
  { name: "Layer 1: Typed Semantic IR (SIR)", desc: "Transforms text into strongly-typed opcode DAG", color: 0x38bdf8 },
  { name: "Layer 2: Speculative Branch Tree", desc: "Simulates parallel downstream tool execution paths", color: 0x8b7cf6 },
  { name: "Layer 3: Formal Verification Gate", desc: "Z3 and AST invariants validate state mutations", color: 0x4ade80 },
  { name: "Layer 4: Atomic State Commit", desc: "Transactions committed with reversible undo journal", color: 0xff8a3d },
];

export default function SemanticStack3D({
  currentStage = 2,
  isRollbackActive = false,
  className = "",
  onLayerSelect,
}: SemanticStackProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Layer Planes
    const layerPlanes: THREE.Mesh[] = [];
    const layerHeight = 1.0;
    const totalLayers = LAYERS.length;

    LAYERS.forEach((layer, idx) => {
      const yPos = (idx - totalLayers / 2) * layerHeight;

      // Holographic Plate
      const planeGeo = new THREE.BoxGeometry(4.2, 0.08, 2.6);
      const isSelected = idx === currentStage;
      const planeMat = new THREE.MeshBasicMaterial({
        color: isRollbackActive ? 0xf43f5e : (isSelected ? layer.color : 0x1a2133),
        transparent: true,
        opacity: isSelected ? 0.85 : 0.4,
        wireframe: false,
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.set(0, yPos, 0);
      planeMesh.userData = { name: layer.name, desc: layer.desc, index: idx };
      group.add(planeMesh);
      layerPlanes.push(planeMesh);

      // Wireframe Outline
      const wireGeo = new THREE.EdgesGeometry(planeGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isRollbackActive ? 0xf43f5e : layer.color,
        transparent: true,
        opacity: isSelected ? 0.95 : 0.35,
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      wireMesh.position.set(0, yPos, 0);
      group.add(wireMesh);

      // Floating Node on Plate
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: isRollbackActive ? 0xf43f5e : layer.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(Math.sin(idx * 2) * 1.2, yPos + 0.18, Math.cos(idx * 2) * 0.7);
      group.add(nodeMesh);
    });

    // Connecting Vertical Data Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, totalLayers * layerHeight, 16);
    const pillarMat = new THREE.MeshBasicMaterial({
      color: isRollbackActive ? 0xf43f5e : 0x5eead4,
      transparent: true,
      opacity: 0.6,
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    group.add(pillar);

    // Speculative Branch Particles
    const branchCount = 40;
    const branchGeo = new THREE.BufferGeometry();
    const branchPos = new Float32Array(branchCount * 3);
    for (let i = 0; i < branchCount * 3; i += 3) {
      branchPos[i] = (Math.random() - 0.5) * 3.5;
      branchPos[i + 1] = (Math.random() - 0.5) * (totalLayers * layerHeight);
      branchPos[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    branchGeo.setAttribute("position", new THREE.BufferAttribute(branchPos, 3));
    const branchMat = new THREE.PointsMaterial({
      color: isRollbackActive ? 0xf43f5e : 0x8b7cf6,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
    });
    const branchPoints = new THREE.Points(branchGeo, branchMat);
    group.add(branchPoints);

    // Drag rotation
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
      group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x + dy * 0.003));
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
      const hits = raycaster.intersectObjects(layerPlanes);
      if (hits.length > 0) {
        const u = hits[0].object.userData;
        onLayerSelect?.(u.name, u.desc);
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
      }

      // Gentle floating layer oscillation
      layerPlanes.forEach((plane, idx) => {
        const base = (idx - totalLayers / 2) * layerHeight;
        plane.position.y = base + Math.sin(elapsed * 2 + idx) * 0.04;
      });

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
  }, [currentStage, isRollbackActive, onLayerSelect]);

  return <div ref={mountRef} className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`} />;
}
