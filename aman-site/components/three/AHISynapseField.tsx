"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AHISynapseProps {
  onAgentClick?: (agentName: string, desc: string) => void;
  className?: string;
}

const AGENTS = [
  { name: "Symbolic SMT Engine", role: "Formal mathematical & constraint solver (Z3)", color: 0x5eead4 },
  { name: "Deep Neural Reasoner", role: "Autoregressive generative planning (LLM)", color: 0x8b7cf6 },
  { name: "Deterministic AST Gate", role: "Compile-time syntax & schema verifier", color: 0x38bdf8 },
  { name: "Fast Heuristic Filter", role: "Microsecond token classification & triage", color: 0x4ade80 },
  { name: "Native Kernel Bridge", role: "Zero-copy shared memory tensor dispatcher", color: 0xff8a3d },
  { name: "Invariant Audit Probe", role: "Zero-leak formal invariant checker", color: 0xf43f5e },
];

export default function AHISynapseField({ onAgentClick, className = "" }: AHISynapseProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core Heterogeneous Orchestrator Hub
    const coreGeo = new THREE.DodecahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8b7cf6,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Agent Nodes
    const agentMeshes: THREE.Mesh[] = [];
    const curvePoints: THREE.Vector3[][] = [];
    const agentRadius = 3.6;

    AGENTS.forEach((agent, i) => {
      const angle = (i / AGENTS.length) * Math.PI * 2;
      const x = Math.cos(angle) * agentRadius;
      const y = Math.sin(angle) * (agentRadius * 0.7);
      const z = (i % 2 === 0 ? 0.8 : -0.8);

      const pos = new THREE.Vector3(x, y, z);

      // Node Mesh
      const geo = new THREE.IcosahedronGeometry(0.32, 0);
      const mat = new THREE.MeshBasicMaterial({ color: agent.color, wireframe: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = { name: agent.name, role: agent.role };
      group.add(mesh);
      agentMeshes.push(mesh);

      // Outer Ring
      const ringGeo = new THREE.RingGeometry(0.42, 0.46, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: agent.color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      group.add(ring);

      // Quadratic Bezier Synapse Curve to Core
      const midPoint = new THREE.Vector3(x * 0.5, y * 0.5 + 0.6, z * 0.5);
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), midPoint, pos);
      const pts = curve.getPoints(30);
      curvePoints.push(pts);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({ color: agent.color, transparent: true, opacity: 0.45 });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });

    // Synaptic Signal Impulses
    const impulseCount = 24;
    const impulseGeo = new THREE.BufferGeometry();
    const impulsePos = new Float32Array(impulseCount * 3);
    const impulseMeta: { agentIdx: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < impulseCount; i++) {
      const aIdx = i % AGENTS.length;
      impulseMeta.push({
        agentIdx: aIdx,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.015,
      });
      impulsePos[i * 3] = 0;
      impulsePos[i * 3 + 1] = 0;
      impulsePos[i * 3 + 2] = 0;
    }

    impulseGeo.setAttribute("position", new THREE.BufferAttribute(impulsePos, 3));
    const impulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const impulsePoints = new THREE.Points(impulseGeo, impulseMat);
    group.add(impulsePoints);

    // Interaction handlers
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
      const hits = raycaster.intersectObjects(agentMeshes);
      if (hits.length > 0) {
        const u = hits[0].object.userData;
        onAgentClick?.(u.name, u.role);
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
      const dt = clock.getDelta();

      if (!dragging && !reduceMotion) {
        group.rotation.y += 0.002;
      }

      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.007;

      agentMeshes.forEach((mesh, i) => {
        mesh.rotation.y += 0.012;
        mesh.rotation.z += 0.008;
      });

      // Update impulse points
      const positions = impulseGeo.attributes.position.array as Float32Array;
      impulseMeta.forEach((imp, i) => {
        imp.progress += imp.speed;
        if (imp.progress >= 1) imp.progress = 0;
        const pts = curvePoints[imp.agentIdx];
        if (pts && pts.length > 0) {
          const ptIdx = Math.floor(imp.progress * (pts.length - 1));
          const p = pts[ptIdx];
          positions[i * 3] = p.x;
          positions[i * 3 + 1] = p.y;
          positions[i * 3 + 2] = p.z;
        }
      });
      impulseGeo.attributes.position.needsUpdate = true;

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
  }, [onAgentClick]);

  return <div ref={mountRef} className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`} />;
}
