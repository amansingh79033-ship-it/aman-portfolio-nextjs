"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CONCEPTS } from "@/lib/aiConcepts";

type Props = {
  onSelect?: (id: number) => void;
  interactive?: boolean;
  className?: string;
};

/**
 * The site's signature element: an orchestrator node in the center
 * delegating to ten satellite nodes (one per AI-efficiency concept).
 * Pulses travel outward in sequence to visualize one-agent-one-task
 * handoff. Drag to rotate; click a node to inspect it.
 */
export default function AgentConstellation({
  onSelect,
  interactive = true,
  className = "",
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // orchestrator (center) node
    const centerGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0x8b7cf6,
      wireframe: true,
    });
    const centerNode = new THREE.Mesh(centerGeo, centerMat);
    group.add(centerNode);

    // satellite nodes, one per concept, arranged on a sphere
    const satelliteMeshes: THREE.Mesh[] = [];
    const lineMats: THREE.LineBasicMaterial[] = [];
    const radius = 4.2;
    const n = CONCEPTS.length;

    CONCEPTS.forEach((concept, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const geo = new THREE.SphereGeometry(0.16, 20, 20);
      const mat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { conceptId: concept.id, baseColor: 0x5eead4 };
      group.add(mesh);
      satelliteMeshes.push(mesh);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2c3040,
        transparent: true,
        opacity: 0.6,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        mesh.position,
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
      lineMats.push(lineMat);
    });

    // ambient starfield for depth
    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 40;
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x333850, size: 0.05 })
    );
    scene.add(stars);

    // pointer drag rotation
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0.0009;
    let velY = 0;

    const onDown = (e: PointerEvent) => {
      if (!interactive) return;
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
      group.rotation.y += velX;
      group.rotation.x += velY;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onClick = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(satelliteMeshes);
      if (hits.length > 0) {
        const id = hits[0].object.userData.conceptId;
        onSelect?.(id);
      }
    };

    renderer.domElement.style.touchAction = "none";
    if (interactive) {
      renderer.domElement.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      renderer.domElement.addEventListener("pointerup", onClick);
    }

    let raf = 0;
    let t = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      t += dt;

      if (!dragging && !reduceMotion) {
        group.rotation.y += velX * 0.4;
        group.rotation.x += velY * 0.4;
        velX *= 0.985;
        velY *= 0.985;
        group.rotation.y += 0.0009;
      }

      centerNode.rotation.y += reduceMotion ? 0 : 0.004;
      centerNode.rotation.x += reduceMotion ? 0 : 0.002;

      // sequential pulse along lines 1 -> 10 -> loop, visualizing hand-off order
      if (!reduceMotion) {
        const cycle = 6; // seconds per full 1..10 sweep
        const active = Math.floor((t % cycle) / (cycle / n));
        lineMats.forEach((m, i) => {
          const isActive = i === active;
          m.color.set(isActive ? 0x5eead4 : 0x2c3040);
          m.opacity = isActive ? 0.95 : 0.35;
        });
        satelliteMeshes.forEach((mesh, i) => {
          const isActive = i === active;
          const scale = isActive ? 1.6 : 1;
          mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scale, 0.15));
        });
      }

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
      if (interactive) {
        renderer.domElement.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        renderer.domElement.removeEventListener("pointerup", onClick);
      }
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      centerGeo.dispose();
      centerMat.dispose();
      satelliteMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      starGeo.dispose();
    };
  }, [interactive, onSelect]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}
