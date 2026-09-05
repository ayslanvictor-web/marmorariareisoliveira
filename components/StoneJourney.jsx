'use client';
import { useEffect, useRef, useState } from 'react';
export default function StoneJourney() {
  const host = useRef(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    let disposed = false,
      cleanup = () => {};
    (async () => {
      try {
        const T = await import('three');
        const { RoomEnvironment } =
          await import('three/addons/environments/RoomEnvironment.js');
        if (disposed) return;
        const el = host.current,
          renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        el.appendChild(renderer.domElement);
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(46, 1, 0.1, 120);
        scene.fog = new T.FogExp2(0x060c13, 0.032);
        const pm = new T.PMREMGenerator(renderer),
          room = new RoomEnvironment(),
          environment = pm.fromScene(room, 0.02);
        room.dispose();
        scene.environment = environment.texture;
        scene.environmentIntensity = 1.3;
        const texture = await new T.TextureLoader().loadAsync(
          '/images/marble-albedo.webp',
        );
        if (disposed) {
          texture.dispose();
          environment.dispose();
          pm.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          return;
        }
        texture.colorSpace = T.SRGBColorSpace;
        const stone = new T.MeshPhysicalMaterial({
          map: texture,
          color: 0x25313b,
          metalness: 0.42,
          roughness: 0.23,
          clearcoat: 0.65,
        });
        const gold = new T.MeshStandardMaterial({
          color: 0xd8bb74,
          emissive: 0xa98a40,
          emissiveIntensity: 0.5,
          metalness: 0.9,
          roughness: 0.19,
        });
        const geometries = [];
        const emblem = new T.Group();
        scene.add(emblem);
        function addShape(points) {
          const shape = new T.Shape();
          points.forEach(([x, y], i) =>
            i ? shape.lineTo(x, y) : shape.moveTo(x, y),
          );
          shape.closePath();
          const geometry = new T.ExtrudeGeometry(shape, {
            depth: 0.21,
            bevelEnabled: true,
            bevelSize: 0.025,
            bevelThickness: 0.025,
            bevelSegments: 2,
            steps: 1,
          });
          geometries.push(geometry);
          const mesh = new T.Mesh(geometry, stone);
          emblem.add(mesh);
          const edges = new T.EdgesGeometry(geometry, 35);
          geometries.push(edges);
          emblem.add(
            new T.LineSegments(
              edges,
              new T.LineBasicMaterial({
                color: 0xe4ca88,
                transparent: true,
                opacity: 0.85,
              }),
            ),
          );
        }
        addShape([
          [-1.2, 0.25],
          [-0.7, 0.8],
          [0.7, 0.8],
          [1.2, 0.25],
          [0, -1.25],
        ]);
        addShape([
          [-1, 0.95],
          [-1.2, 1.6],
          [-0.55, 1.23],
          [0, 1.88],
          [0.55, 1.23],
          [1.2, 1.6],
          [1, 0.95],
        ]);
        const line = (a, b) => {
          const g = new T.CylinderGeometry(0.012, 0.012, a.distanceTo(b), 8);
          geometries.push(g);
          const m = new T.Mesh(g, gold);
          m.position.copy(a).add(b).multiplyScalar(0.5);
          m.quaternion.setFromUnitVectors(
            new T.Vector3(0, 1, 0),
            b.clone().sub(a).normalize(),
          );
          emblem.add(m);
        };
        for (const [a, b] of [
          [
            [-1.2, 0.25, 0.25],
            [1.2, 0.25, 0.25],
          ],
          [
            [-0.7, 0.8, 0.25],
            [0, -1.25, 0.25],
          ],
          [
            [0.7, 0.8, 0.25],
            [0, -1.25, 0.25],
          ],
        ])
          line(new T.Vector3(...a), new T.Vector3(...b));
        const particles = new Float32Array(1800);
        let seed = 44;
        const rnd = () => {
          seed = (seed * 1664525 + 1013904223) >>> 0;
          return seed / 4294967296;
        };
        for (let i = 0; i < particles.length; i += 3) {
          particles[i] = (rnd() - 0.5) * 50;
          particles[i + 1] = (rnd() - 0.5) * 32;
          particles[i + 2] = -rnd() * 70;
        }
        const pg = new T.BufferGeometry();
        pg.setAttribute('position', new T.BufferAttribute(particles, 3));
        geometries.push(pg);
        const dustMat = new T.PointsMaterial({
          color: 0xd9cead,
          size: 0.025,
          transparent: true,
          opacity: 0.65,
          sizeAttenuation: true,
        });
        const dust = new T.Points(pg, dustMat);
        scene.add(dust);
        const streaks = new T.Group();
        scene.add(streaks);
        const streakMat = new T.LineBasicMaterial({
          color: 0x9faeb9,
          transparent: true,
          opacity: 0.23,
        });
        for (let i = 0; i < 65; i++) {
          const x = (rnd() - 0.5) * 35,
            y = (rnd() - 0.5) * 24,
            z = -rnd() * 60;
          const g = new T.BufferGeometry().setFromPoints([
            new T.Vector3(x, y, z),
            new T.Vector3(x + 0.8, y + 2 + rnd() * 5, z - 7),
          ]);
          geometries.push(g);
          streaks.add(new T.Line(g, streakMat));
        }
        const stones = new T.Group();
        scene.add(stones);
        for (let i = 0; i < 15; i++) {
          const g = new T.BoxGeometry(0.3 + rnd() * 1.4, 1 + rnd() * 3, 0.12);
          geometries.push(g);
          const m = new T.Mesh(g, stone);
          m.position.set(
            (i % 2 ? 1 : -1) * (4 + rnd() * 6),
            (rnd() - 0.5) * 8,
            -5 - i * 3,
          );
          m.rotation.set(rnd() * 0.2, rnd(), rnd() * 0.15);
          stones.add(m);
        }
        scene.add(new T.HemisphereLight(0xe9f1ff, 0x142235, 1));
        const key = new T.DirectionalLight(0xffe3a0, 3);
        key.position.set(3, 4, 5);
        scene.add(key);
        const blue = new T.PointLight(0x8ecbff, 35, 15);
        blue.position.set(-3, 0, 3);
        scene.add(blue);
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        let progress = 0,
          current = 0,
          frame = 0,
          last = 0,
          pointerX = 0,
          pointerY = 0,
          dirty = true;
        const resize = () => {
          renderer.setSize(el.clientWidth, el.clientHeight);
          camera.aspect = el.clientWidth / el.clientHeight;
          camera.updateProjectionMatrix();
          dirty = true;
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();
        const scroll = () => {
          progress = reduced.matches
            ? 0
            : window.scrollY /
              Math.max(1, document.documentElement.scrollHeight - innerHeight);
          dirty = true;
        };
        const pointer = (e) => {
          pointerX = (e.clientX / innerWidth - 0.5) * 0.18;
          pointerY = (e.clientY / innerHeight - 0.5) * 0.12;
          if (!reduced.matches) dirty = true;
        };
        const lost = (e) => {
          e.preventDefault();
          setUnavailable(true);
        };
        window.addEventListener('scroll', scroll, { passive: true });
        window.addEventListener('pointermove', pointer, { passive: true });
        renderer.domElement.addEventListener('webglcontextlost', lost);
        scroll();
        function draw(t) {
          const dt = Math.min((t - last) / 1000, 0.05);
          last = t;
          if (
            !document.hidden &&
            (dirty || Math.abs(progress - current) > 0.00001)
          ) {
            dirty = false;
            current +=
              (progress - current) *
              (reduced.matches ? 1 : Math.min(1, dt * 5));
            const p = current;
            camera.position.set(
              Math.sin(p * 3) * 0.8 + (reduced.matches ? 0 : pointerX),
              0.3 + (reduced.matches ? 0 : pointerY),
              camera.aspect < 0.8 ? 8.4 : 6.4,
            );
            camera.lookAt(0, 0.25, 0);
            emblem.position.set(
              camera.aspect < 0.8 ? 0.55 : 1.9,
              Math.sin(p * 6) * 0.35,
              -p * 3,
            );
            emblem.rotation.set(
              0.06,
              Math.sin(p * 5) * 0.9 + (reduced.matches ? 0 : pointerX),
              -0.06,
            );
            streaks.position.z = p * 38;
            stones.position.z = p * 31;
            stones.rotation.y = p * 0.13;
            dust.position.z = p * 30;
            renderer.render(scene, camera);
          }
          frame = requestAnimationFrame(draw);
        }
        frame = requestAnimationFrame(draw);
        cleanup = () => {
          cancelAnimationFrame(frame);
          ro.disconnect();
          window.removeEventListener('scroll', scroll);
          window.removeEventListener('pointermove', pointer);
          renderer.domElement.removeEventListener('webglcontextlost', lost);
          geometries.forEach((g) => g.dispose());
          scene.traverse((o) => {
            if (o.material && o.material !== stone && o.material !== gold)
              o.material.dispose();
          });
          stone.dispose();
          gold.dispose();
          texture.dispose();
          environment.dispose();
          pm.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!disposed) setUnavailable(true);
      }
    })();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return (
    <div
      className={`journey-bg ${unavailable ? 'journey-unavailable' : ''}`}
      ref={host}
      aria-hidden="true"
    />
  );
}
