"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Vitran7MeshProps {
  fleetSize?: number; // 100 to 50,000
  activeMode?: "mesh" | "sharding" | "thermal";
  className?: string;
  onNodeSelect?: (nodeInfo: { id: string; type: string; tflops: number; load: number }) => void;
}

export default function Vitran7Mesh3D({
  fleetSize = 2500,
  activeMode = "mesh",
  className = "",
  onNodeSelect,
}: Vitran7MeshProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b10, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(16, 24, 0x5eead4, 0x1f2438);
    gridHelper.position.y = -2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    rootGroup.add(gridHelper);

    // Central Datacentre Hub / Gateway
    const hubGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.6, 8);
    const hubMat = new THREE.MeshBasicMaterial({
      color: 0x8b7cf6,
      wireframe: true,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    hubMesh.position.y = -1.7;
    rootGroup.add(hubMesh);

    // Halo ring around hub
    const hubRingGeo = new THREE.RingGeometry(1.2, 1.25, 32);
    const hubRingMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const hubRing = new THREE.Mesh(hubRingGeo, hubRingMat);
    hubRing.rotation.x = Math.PI / 2;
    hubRing.position.y = -1.68;
    rootGroup.add(hubRing);

    // EV Cluster Nodes
    const evNodes: THREE.Mesh[] = [];
    const evPositions: THREE.Vector3[] = [];
    const connectionLines: THREE.Line[] = [];
    const nodeCount = 18;

    const nodeColors = {
      mesh: 0x5eead4, // Cyan
      sharding: 0x8b7cf6, // Violet
      thermal: 0xff8a3d, // Amber
    };

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.1);
      const radius = 2.4 + (i % 3) * 1.3;
      const yOffset = -1.4 + Math.sin(i * 1.5) * 1.2 + (i % 4) * 0.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const pos = new THREE.Vector3(x, yOffset, z);
      evPositions.push(pos);

      // Node vehicle geometry (Octahedron with outer wireframe ring)
      const evGeo = new THREE.OctahedronGeometry(0.18, 0);
      const evMat = new THREE.MeshBasicMaterial({
        color: nodeColors[activeMode] || 0x5eead4,
        wireframe: false,
      });
      const node = new THREE.Mesh(evGeo, evMat);
      node.position.copy(pos);
      node.userData = {
        id: `EV-NODE-${i + 1}`,
        type: i % 2 === 0 ? "Tesla FSD HW4 (Parked)" : "NVIDIA Orin Depot Node",
        tflops: 250 + (i % 5) * 50,
        load: 45 + (i * 7) % 50,
      };
      rootGroup.add(node);
      evNodes.push(node);

      // Connect each EV node to hub and nearby peers
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2b324b,
        transparent: true,
        opacity: 0.4,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -1.7, 0),
        pos,
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);
      connectionLines.push(line);
    }

    // Peer-to-peer interconnect mesh between adjacent EV nodes
    for (let i = 0; i < nodeCount; i++) {
      const nextIdx = (i + 1) % nodeCount;
      const peerLineMat = new THREE.LineBasicMaterial({
        color: 0x3d496a,
        transparent: true,
        opacity: 0.35,
      });
      const peerLineGeo = new THREE.BufferGeometry().setFromPoints([
        evPositions[i],
        evPositions[nextIdx],
      ]);
      const peerLine = new THREE.Line(peerLineGeo, peerLineMat);
      rootGroup.add(peerLine);
      connectionLines.push(peerLine);
    }

    // Floating Packet / Tensor Particles
    const packetCount = 60;
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    const packetTargets: { start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = [];

    for (let i = 0; i < packetCount; i++) {
      const nodeA = evPositions[i % nodeCount];
      const nodeB = (i % 2 === 0) ? new THREE.Vector3(0, -1.7, 0) : evPositions[(i + 3) % nodeCount];
      packetTargets.push({
        start: nodeA,
        end: nodeB,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.012,
      });
      packetPos[i * 3] = nodeA.x;
      packetPos[i * 3 + 1] = nodeA.y;
      packetPos[i * 3 + 2] = nodeA.z;
    }

    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    rootGroup.add(packetPoints);

    // Orbit Drag Interaction
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0.001;
    let velY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * 0.0025;
      velY = dy * 0.0025;
      rootGroup.rotation.y += velX;
      rootGroup.rotation.x = Math.max(-0.6, Math.min(0.8, rootGroup.rotation.x + velY));
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
      const hits = raycaster.intersectObjects(evNodes);
      if (hits.length > 0) {
        const u = hits[0].object.userData;
        onNodeSelect?.({
          id: u.id,
          type: u.type,
          tflops: u.tflops,
          load: u.load,
        });
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
        rootGroup.rotation.y += 0.0015;
      }

      hubMesh.rotation.y += 0.008;
      hubRing.rotation.z += 0.005;

      // Animate EV nodes hovering
      evNodes.forEach((node, i) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.015;
        node.position.y = evPositions[i].y + Math.sin(clock.getElapsedTime() * 2 + i) * 0.06;
      });

      // Animate tensor packets
      const positions = packetGeo.attributes.position.array as Float32Array;
      packetTargets.forEach((p, i) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;
        const curX = THREE.MathUtils.lerp(p.start.x, p.end.x, p.progress);
        const curY = THREE.MathUtils.lerp(p.start.y, p.end.y, p.progress);
        const curZ = THREE.MathUtils.lerp(p.start.z, p.end.z, p.progress);
        positions[i * 3] = curX;
        positions[i * 3 + 1] = curY;
        positions[i * 3 + 2] = curZ;
      });
      packetGeo.attributes.position.needsUpdate = true;

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
  }, [activeMode, fleetSize, onNodeSelect]);

  return <div ref={mountRef} className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`} />;
}
