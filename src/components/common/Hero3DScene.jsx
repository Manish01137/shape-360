import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero3DScene.css";

/**
 * Hero3DScene — a lightweight, cursor-reactive 3D layer that sits
 * behind the hero. Floating wireframe icosahedron + glowing orb,
 * with subtle mouse parallax and constant rotation.
 *
 * Heavy stuff (renderer, geometry) is created once. Mouse movement
 * only updates target rotation — no re-renders.
 */
const Hero3DScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* Respect prefers-reduced-motion — render once, skip animation loop */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    /* ===== Scene + Camera + Renderer ===== */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05080f, 5, 18);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ===== Lights ===== */
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xc9a84c, 2.4, 30);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x4cb0ff, 1.6, 25);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);

    /* ===== Core Object: refractive icosahedron ===== */
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2540,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true,
      emissive: 0x0a1228,
      emissiveIntensity: 0.4,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(ico);

    /* Wireframe overlay — the "premium tech" feel */
    const wireGeometry = new THREE.IcosahedronGeometry(1.62, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wire);

    /* Orbiting accent torus */
    const torusGeometry = new THREE.TorusGeometry(2.6, 0.04, 12, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.45,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 2.4;
    scene.add(torus);

    /* Floating particle field */
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    /* ===== Mouse parallax targets ===== */
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    window.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseleave", onMouseLeave);

    /* ===== Resize handler ===== */
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(mount);

    /* ===== Animation loop ===== */
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      /* Smooth easing toward mouse target */
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      ico.rotation.x = elapsed * 0.12 + target.y * 0.4;
      ico.rotation.y = elapsed * 0.18 + target.x * 0.5;
      wire.rotation.x = ico.rotation.x;
      wire.rotation.y = ico.rotation.y;

      torus.rotation.z = elapsed * 0.2;
      torus.rotation.x = Math.PI / 2.4 + Math.sin(elapsed * 0.4) * 0.15;

      particles.rotation.y = elapsed * 0.03;

      /* Subtle camera parallax */
      camera.position.x += (target.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (target.y * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (!prefersReducedMotion) rafId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    /* ===== Cleanup ===== */
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseleave", onMouseLeave);

      icoGeometry.dispose();
      icoMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-3d-scene" aria-hidden="true" />;
};

export default Hero3DScene;
