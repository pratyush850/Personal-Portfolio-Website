import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
// ─── Data ─────────────────────────────────────────────────────────────────────
const educationData = [
  {
    id: 1,
    type: "University",
    school: "University Of Engineering & Management, Kolkata",
    degree: "Bachalor's Of Technology (B.Tech)",
    stream: "Computer Science & Technology (CST)",
    year: "2021 – 2025",
    cgpa: "8.5",
    color: "#00cea8",
    icon: "👩🏻‍🎓",
  },
  {
    id: 2,
    type: "School",
    school: "Raiganj Coronation High School",
    degree: "Higher Secondary",
    stream: "PCMB",
    year: "2019 – 2021",
    cgpa: "86.80%",
    color: "#804dee",
    icon: "🎓",
  },
  {
    id: 3,
    type: "School",
    school: "Raiganj Coronation High School",
    degree: "Secondary",
    stream: "General",
    year: "2019",
    cgpa: "87.85%",
    color: "#f5a623",
    icon: "🏫",
  },
];

const N = educationData.length;

// ─── Three.js 3-D Spaceship (reference-matched) ────────────────────────────────
const Spaceship = ({ bob = 0 }) => {
  const mountRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let cleanup = null;

    const loadThree = () => {
      const THREE = window.THREE;
      const W = 140, H = 80;

      const renderer = new THREE.WebGLRenderer({ canvas: mountRef.current, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.6;

      const scene = new THREE.Scene();

      // Camera — angled top-right like the reference image
      const camera = new THREE.PerspectiveCamera(28, W / H, 0.01, 200);
      camera.position.set(2.2, 1.8, 5.5);
      camera.lookAt(0, 0, 0);

      // ── LIGHTS ────────────────────────────────────────────────────────────
      // Strong top-right key (makes silver hull pop)
      const key = new THREE.DirectionalLight(0xffffff, 4.5);
      key.position.set(4, 6, 5);
      key.castShadow = true;
      scene.add(key);
      // Cool blue fill from left
      const fill = new THREE.DirectionalLight(0x99bbff, 1.5);
      fill.position.set(-5, 2, 3);
      scene.add(fill);
      // Warm rim from below-rear
      const rim = new THREE.DirectionalLight(0xffffff, 2.0);
      rim.position.set(-3, -3, -4);
      scene.add(rim);
      // Teal engine glow point
      const engLight = new THREE.PointLight(0x00e8d5, 6, 4);
      engLight.position.set(-2.0, 0, 0);
      scene.add(engLight);
      // Subtle ambient
      scene.add(new THREE.AmbientLight(0x112233, 3));

      // ── MATERIALS ─────────────────────────────────────────────────────────
      // Silver hull — high metalness, low roughness like polished aluminium
      const silverMat = new THREE.MeshStandardMaterial({
        color: 0xc8cdd8,
        metalness: 0.95,
        roughness: 0.12,
      });
      // Dark navy panels
      const navyMat = new THREE.MeshStandardMaterial({
        color: 0x0d1f3c,
        metalness: 0.85,
        roughness: 0.22,
      });
      // Glossy black canopy
      const canopyMat = new THREE.MeshStandardMaterial({
        color: 0x050a10,
        metalness: 0.05,
        roughness: 0.0,
        transparent: true,
        opacity: 0.88,
      });
      // Teal engine ring emissive
      const tealMat = new THREE.MeshStandardMaterial({
        color: 0x00e8d5,
        emissive: 0x00e8d5,
        emissiveIntensity: 3.0,
        metalness: 0.3,
        roughness: 0.1,
      });
      // Dark engine housing
      const engineMat = new THREE.MeshStandardMaterial({
        color: 0x0a0f18,
        metalness: 0.9,
        roughness: 0.2,
      });
      // Turbine blade (dark teal metal)
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x0a2a28,
        emissive: 0x003328,
        emissiveIntensity: 0.5,
        metalness: 0.95,
        roughness: 0.15,
      });
      // Silver accent stripe
      const accentMat = new THREE.MeshStandardMaterial({
        color: 0xe0e4ec,
        metalness: 0.98,
        roughness: 0.05,
      });
      // Dark grey detail
      const detailMat = new THREE.MeshStandardMaterial({
        color: 0x1a2030,
        metalness: 0.8,
        roughness: 0.35,
      });

      // ── SCENE GROUP ───────────────────────────────────────────────────────
      const ship = new THREE.Group();
      // Tilt like the reference: pitched up-left, slight yaw
      ship.rotation.set(0.32, -0.22, 0.18);
      scene.add(ship);

      const addMesh = (geo, mat, x=0,y=0,z=0, rx=0,ry=0,rz=0, sx=1,sy=1,sz=1) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x,y,z);
        m.rotation.set(rx,ry,rz);
        m.scale.set(sx,sy,sz);
        m.castShadow = true;
        m.receiveShadow = true;
        ship.add(m);
        return m;
      };

      // ── FUSELAGE ─────────────────────────────────────────────────────────
      // Main body — teardrop shape: fat middle tapering to sharp nose
      const bodyGeo = new THREE.SphereGeometry(1, 64, 32);
      // Scale: very elongated X, moderate Z, slim Y
      addMesh(bodyGeo, silverMat, 0,0,0, 0,0,0, 2.2, 0.42, 0.65);

      // Top fuselage navy stripe (wide flat box along top)
      const topStripeGeo = new THREE.BoxGeometry(3.6, 0.06, 0.5);
      addMesh(topStripeGeo, navyMat, 0, 0.38, 0);

      // ── NOSE CONE ────────────────────────────────────────────────────────
      // Sharp pointed nose cone — navy tip
      const noseGeo = new THREE.ConeGeometry(0.38, 1.4, 32);
      addMesh(noseGeo, navyMat, 2.85, 0, 0, 0, 0, -Math.PI/2);
      // Silver nose base ring
      const noseRingGeo = new THREE.TorusGeometry(0.37, 0.025, 10, 36);
      addMesh(noseRingGeo, accentMat, 2.15, 0, 0, 0, Math.PI/2, 0);

      // ── CANOPY (swept black glass) ────────────────────────────────────────
      // Elongated flat canopy bubble on top
      const canopyGeo = new THREE.SphereGeometry(1, 32, 16);
      addMesh(canopyGeo, canopyMat, 0.8, 0.28, 0, 0,0,0, 1.05, 0.28, 0.52);
      // Canopy frame (silver rim)
      const cFrameGeo = new THREE.TorusGeometry(0.28, 0.018, 8, 36);
      addMesh(cFrameGeo, accentMat, 0.82, 0.27, 0, Math.PI/2, 0, 0, 1.8, 1, 1.5);

      // ── DELTA WINGS (main swept pair) ────────────────────────────────────
      // Wing: extruded swept shape (navy with silver edge)
      const mkWingGeo = (flip) => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.lineTo(-1.6,  flip * 0.18);
        s.lineTo(-2.4,  flip * 1.55);
        s.lineTo(-1.0,  flip * 1.7);
        s.lineTo( 0.6,  flip * 0.82);
        s.closePath();
        return new THREE.ExtrudeGeometry(s, {
          depth: 0.04, bevelEnabled: true,
          bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2
        });
      };

      const wGeoU = mkWingGeo(1);
      wGeoU.computeVertexNormals();
      const wingU = new THREE.Mesh(wGeoU, navyMat);
      wingU.position.set(0.2, 0.08, 0.04);
      wingU.rotation.set(-0.04, 0, 0);
      wingU.castShadow = true;
      ship.add(wingU);

      const wGeoL = mkWingGeo(-1);
      wGeoL.computeVertexNormals();
      const wingL = new THREE.Mesh(wGeoL, navyMat);
      wingL.position.set(0.2, -0.08, 0.04);
      wingL.rotation.set(0.04, 0, 0);
      wingL.castShadow = true;
      ship.add(wingL);

      // Silver wing leading-edge stripes
      const wStripeGeo = new THREE.BoxGeometry(2.0, 0.022, 0.04);
      addMesh(wStripeGeo, accentMat,  -0.7, 0.75, 0.04, 0,0, 0.55);
      addMesh(wStripeGeo, accentMat,  -0.7,-0.75, 0.04, 0,0,-0.55);

      // ── DORSAL FIN (top, swept back) ──────────────────────────────────────
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(-1.2, 0);
      finShape.lineTo(-1.8, 0.65);
      finShape.lineTo(-0.8, 0.75);
      finShape.lineTo(0.2, 0.3);
      finShape.closePath();
      const finGeo = new THREE.ExtrudeGeometry(finShape, {
        depth: 0.025, bevelEnabled: false
      });
      finGeo.computeVertexNormals();
      const dorsalFin = new THREE.Mesh(finGeo, navyMat);
      dorsalFin.position.set(0.4, 0.4, 0);
      dorsalFin.castShadow = true;
      ship.add(dorsalFin);

      // ── VENTRAL FINS (two small fins below-rear) ──────────────────────────
      const vFinShape = new THREE.Shape();
      vFinShape.moveTo(0, 0);
      vFinShape.lineTo(-1.0, 0);
      vFinShape.lineTo(-1.4, -0.55);
      vFinShape.lineTo(-0.2, -0.48);
      vFinShape.closePath();
      const vFinGeo = new THREE.ExtrudeGeometry(vFinShape, {
        depth: 0.025, bevelEnabled: false
      });
      vFinGeo.computeVertexNormals();

      const vFinL = new THREE.Mesh(vFinGeo, navyMat);
      vFinL.position.set(-0.2, -0.38, 0.18);
      vFinL.rotation.set(-0.3, 0, 0);
      vFinL.castShadow = true;
      ship.add(vFinL);

      const vFinR = new THREE.Mesh(vFinGeo, navyMat);
      vFinR.position.set(-0.2, -0.38, -0.18);
      vFinR.rotation.set(0.3, 0, 0);
      vFinR.castShadow = true;
      ship.add(vFinR);

      // ── ENGINE HOUSING (rear, cylindrical) ───────────────────────────────
      // Main cylinder
      const engHouseGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.7, 32);
      addMesh(engHouseGeo, engineMat, -2.0, 0, 0, 0,0,Math.PI/2);

      // Teal glowing outer ring (the defining feature)
      const tealRingGeo = new THREE.TorusGeometry(0.36, 0.038, 16, 48);
      addMesh(tealRingGeo, tealMat, -2.0, 0, 0, Math.PI/2,0,0);

      // Inner teal ring (double-ring like reference)
      const tealRing2Geo = new THREE.TorusGeometry(0.28, 0.022, 12, 48);
      addMesh(tealRing2Geo, tealMat, -2.0, 0, 0, Math.PI/2,0,0);

      // Turbine blades (dark teal fan inside)
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const bladeGeo = new THREE.BoxGeometry(0.24, 0.04, 0.04);
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(-2.02, Math.sin(angle) * 0.2, Math.cos(angle) * 0.2);
        blade.rotation.set(angle, Math.PI/2, 0);
        blade.castShadow = true;
        ship.add(blade);
      }

      // Engine glow cap (bright inner disc)
      const engCapGeo = new THREE.CircleGeometry(0.25, 32);
      addMesh(engCapGeo, tealMat, -2.36, 0, 0, 0, Math.PI/2, 0);

      // ── ENGINE EXHAUST PLUME ──────────────────────────────────────────────
      const plumeMat = new THREE.MeshStandardMaterial({
        color: 0x00e8d5,
        emissive: 0x00e8d5,
        emissiveIntensity: 2.5,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const plumeGeo = new THREE.ConeGeometry(0.24, 1.2, 16, 1, true);
      addMesh(plumeGeo, plumeMat, -3.0, 0, 0, 0,0,Math.PI/2);

      // ── SIDE ENGINE NACELLES (smaller cylindrical bumps) ─────────────────
      const sNacelleGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.55, 16);
      addMesh(sNacelleGeo, detailMat, -1.55, 0.25, 0.32, 0,0,Math.PI/2);
      addMesh(sNacelleGeo, detailMat, -1.55,-0.25, 0.32, 0,0,Math.PI/2);
      addMesh(sNacelleGeo, detailMat, -1.55, 0.25,-0.32, 0,0,Math.PI/2);
      addMesh(sNacelleGeo, detailMat, -1.55,-0.25,-0.32, 0,0,Math.PI/2);

      // ── PANEL DETAIL LINES ────────────────────────────────────────────────
      // Recessed panel grooves (thin dark strips embedded in hull)
      const panelLineGeo = new THREE.BoxGeometry(0.015, 0.56, 0.7);
      addMesh(panelLineGeo, detailMat,  0.5, 0, 0);
      addMesh(panelLineGeo, detailMat, -0.4, 0, 0);
      addMesh(panelLineGeo, detailMat,  1.2, 0, 0);

      // Belly plate (navy underside strip)
      const bellyGeo = new THREE.BoxGeometry(2.8, 0.05, 0.55);
      addMesh(bellyGeo, navyMat, 0.1, -0.35, 0);

      // ── WING TIPS (silver pointed caps) ───────────────────────────────────
      const tipGeo = new THREE.ConeGeometry(0.06, 0.35, 12);
      addMesh(tipGeo, accentMat, -1.55, 1.52, 0.04, 0,0,-0.45);
      addMesh(tipGeo, accentMat, -1.55,-1.52, 0.04, 0,0, 0.45);

      // ── ANIMATION LOOP ────────────────────────────────────────────────────
      let rafId;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const t = Date.now();
        // Bob driven by parent
        const bv = mountRef.current?._bob ?? 0;
        ship.position.y = bv * 0.01;
        // Very subtle idle drift — like floating in space
        ship.rotation.y = -0.22 + Math.sin(t / 3500) * 0.03;
        ship.rotation.z =  0.18 + Math.sin(t / 4200) * 0.015;
        // Engine glow pulse
        engLight.intensity = 5.5 + Math.sin(t / 180) * 2.0;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        renderer.dispose();
      };
    };

    if (window.THREE) {
      loadThree();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/three@0.128.0/build/three.min.js";
      script.async = true;
      script.onload = loadThree;
      document.head.appendChild(script);
      return () => { if (script.parentNode) script.parentNode.removeChild(script); };
    }

    return () => { if (cleanup) cleanup(); };
  }, []);

  useEffect(() => {
    if (mountRef.current) mountRef.current._bob = bob;
  }, [bob]);

  return (
    <canvas
      ref={mountRef}
      width={140}
      height={80}
      style={{
        display: "block",
        filter: "drop-shadow(0 0 8px #00e8d566) drop-shadow(0 0 18px #0d1f3c88)",
      }}
    />
  );
};

// ─── Stars ─────────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x:       (i * 137.508) % 100,
  y:       (i * 97.3)    % 100,
  size:    0.5 + (i % 5) * 0.38,
  opacity: 0.2 + (i % 7) * 0.1,
  speed:   1   + (i % 5) * 0.6,
}));

const StarField = () => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
    {STARS.map(s => (
      <div key={s.id} style={{
        position:"absolute",
        left:`${s.x}%`, top:`${s.y}%`,
        width:`${s.size}px`, height:`${s.size}px`,
        borderRadius:"50%", background:"white",
        opacity:s.opacity,
        animation:`eduTwinkle ${s.speed}s ease-in-out infinite alternate`,
      }}/>
    ))}
  </div>
);

// ─── Station Card ──────────────────────────────────────────────────────────────
const CARD_WIDTH_RATIO = 0.62; // active card occupies 62% of container width — leaves room for peeks
const CARD_GAP = 24; // px gap between cards

const StationCard = ({ data, index, isActive, cardWidth }) => {
  return (
    <div
      style={{
        width: cardWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 0,
        transition: "opacity 0.45s ease, filter 0.45s ease",
        opacity: isActive ? 1 : 0.32,
        filter: isActive ? "brightness(1)" : "brightness(0.7)",
      }}
    >
      {/* Arm */}
      <div style={{
        width: 2, height: 28,
        background: `linear-gradient(to bottom, transparent, ${data.color}${isActive ? "99" : "44"})`,
        transition: "background 0.45s",
      }}/>

      {/* Ring */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        border: `2px solid ${data.color}${isActive ? "cc" : "44"}`,
        boxShadow: isActive 
          ? `0 0 28px ${data.color}88, inset 0 0 16px ${data.color}22` 
          : "none",
        background: "rgba(5,8,22,0.9)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        transition: "border-color 0.45s, box-shadow 0.45s",
      }}>
        <div style={{
          position: "absolute", inset: 5, borderRadius: "50%",
          border: `1px solid ${data.color}${isActive ? "55" : "22"}`,
          animation: `eduSpin ${8 + index * 2}s linear infinite`,
          transition: "border-color 0.45s",
        }}/>
        <span style={{ fontSize: "1.6rem", position: "relative", zIndex: 1 }}>
          {data.icon}
        </span>
      </div>

      {/* Card */}
      <div style={{
        marginTop: 14,
        width: "100%",
        background: "rgba(20,15,40,0.92)",
        border: `1px solid ${data.color}${isActive ? "55" : "1a"}`,
        borderRadius: 16,
        padding: "18px 22px",
        backdropFilter: "blur(16px)",
        boxShadow: isActive ? `0 0 32px ${data.color}28` : "none",
        transition: "border-color 0.45s, box-shadow 0.45s",
      }}>
        <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${data.color}33` }}>
          <span style={{
            fontSize: 15, fontWeight: 700, letterSpacing: "1.5px",
            textTransform: "uppercase", color: data.color,
            border: `1px solid ${data.color}66`, borderRadius: 20, padding: "2px 10px",
          }}>
            {data.type}
          </span>
        </div>
        <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.35, marginBottom: 4 }}>
          {data.school}
        </p>
        <p style={{ color: "#aaa6c3", fontSize: 17, fontWeight: 500, marginBottom: 14 }}>
          {data.degree}
        </p>
        {[
          ["Stream", data.stream, null],
          ["Year",   data.year,   data.color],
          ["Score",  data.cgpa,   data.color],
        ].map(([label, value, col]) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "baseline", marginBottom: 8,
          }}>
            <span style={{
              color: "#6b7280", fontSize: 15, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap",
            }}>
              {label}
            </span>
            <span style={{
              color: col || "#e0deff",
              fontSize: 17, fontWeight: col ? 700 : 500, textAlign: "right",
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const Education = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [bob, setBob] = useState(0);
  const [containerW, setContainerW] = useState(0);

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const accRef = useRef(0);

  // ── Measure container width ─────────────────────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerW(containerRef.current.offsetWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // ── Bob animation ────────────────────────────────────────────────────────
  useEffect(() => {
    let raf;
    const tick = () => { setBob(Math.sin(Date.now() / 600) * 4); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Navigate ─────────────────────────────────────────────────────────────
  const goTo = useCallback((next) => {
    const clamped = Math.max(0, Math.min(N - 1, next));
    if (clamped === activeIdx) return;
    setActiveIdx(clamped);
    accRef.current = 0;
  }, [activeIdx]);

  // ── Wheel handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const THRESHOLD = 80;

    const onWheel = (e) => {
      const isH = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isH && !e.shiftKey) return;

      e.preventDefault();
      e.stopPropagation();

      const delta = isH ? e.deltaX : e.deltaY;
      accRef.current += delta;

      if (accRef.current >= THRESHOLD) {
        accRef.current = 0;
        goTo(activeIdx + 1);
      } else if (accRef.current <= -THRESHOLD) {
        accRef.current = 0;
        goTo(activeIdx - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goTo, activeIdx]);

  // ── Pointer drag ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let startX = null, startIdx = 0, fired = false;
    const DRAG_THRESHOLD = 70;

    const down = (e) => {
      startX = e.clientX; startIdx = activeIdx;
      fired = false;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      if (startX === null || fired) return;
      const dx = startX - e.clientX;
      if (Math.abs(dx) >= DRAG_THRESHOLD) {
        fired = true;
        goTo(startIdx + (dx > 0 ? 1 : -1));
      }
    };
    const up = () => { startX = null; fired = false; };

    el.addEventListener("pointerdown",   down);
    el.addEventListener("pointermove",   move);
    el.addEventListener("pointerup",     up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown",   down);
      el.removeEventListener("pointermove",   move);
      el.removeEventListener("pointerup",     up);
      el.removeEventListener("pointercancel", up);
    };
  }, [goTo, activeIdx]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIdx + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(activeIdx - 1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [goTo, activeIdx]);

  // Card width is a ratio of the container — leaves room for peek cards on both sides
  const cardWidth = containerW * CARD_WIDTH_RATIO;

  // To center card[i]: shift row left by (i * (cardWidth + gap)), then add
  // the offset that centers a card of cardWidth within containerW.
  const centerOffset = (containerW - cardWidth) / 2;
  const translateX = centerOffset - activeIdx * (cardWidth + CARD_GAP);

  // Ship position (% along track): 0% at station 0, 100% at station N-1
  const shipLeftPct = `${(activeIdx / (N - 1)) * 100}%`;

  return (
    <>
      <style>{`
        @keyframes eduTwinkle {
          from { opacity:0.1; transform:scale(0.8); }
          to   { opacity:1;   transform:scale(1.2); }
        }
        @keyframes eduSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        .edu-section {
          position:relative; width:100%;
          background:#050816;
          padding: 60px 0 48px;
          overflow:visible;
          user-select:none; cursor:grab;
        }
        .edu-section:active        { cursor:grabbing; }
        .edu-section:focus-visible { outline:2px solid #804dee; outline-offset:-2px; }

        .edu-hint {
          display:flex; align-items:center; justify-content:center;
          flex-wrap:wrap; gap:6px;
          margin-bottom:18px; opacity:0.5;
          position:relative; z-index:10;
        }
        .edu-hint kbd {
          font-family:"Poppins",sans-serif;
          font-size:9px; font-weight:600;
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.18);
          border-radius:4px; padding:2px 7px; color:#aaa6c3;
        }
        .edu-hint span { font-size:10px; color:#6b7280; letter-spacing:1.2px; text-transform:uppercase; }

        .edu-prog-track {
          margin: 0 clamp(24px,6vw,80px) 18px;
          height:2px; border-radius:2px;
          background:rgba(255,255,255,0.08);
          position:relative; z-index:10;
        }
        .edu-prog-fill {
          height:100%; border-radius:2px;
          background:linear-gradient(90deg,#804dee,#00cea8);
          transition:width 0.45s cubic-bezier(0.4,0,0.2,1);
          position:relative;
        }
        .edu-prog-fill::after {
          content:''; position:absolute;
          right:-4px; top:-3px; width:8px; height:8px;
          border-radius:50%; background:#00cea8; box-shadow:0 0 8px #00cea8;
        }

        /* ── Flight track ── */
        .edu-track-wrap {
          position:relative; z-index:10;
          margin:0 clamp(24px,6vw,80px);
          height:2px; margin-bottom:20px;
          overflow:visible;
        }
        .edu-track-line {
          position:absolute; inset:0;
          background:repeating-linear-gradient(
            90deg,
            rgba(128,77,238,0.5) 0px, rgba(128,77,238,0.5) 10px,
            transparent 10px, transparent 22px
          );
        }
        .edu-track-end {
          position:absolute; top:-3px;
          width:8px; height:8px; border-radius:50%;
          background:#804dee; box-shadow:0 0 6px #804dee;
        }
        .edu-ship {
          position:absolute; top:-54px;
          transition:left 0.45s cubic-bezier(0.4,0,0.2,1);
          transform:translateX(-55px);
        }

        /* ── Carousel container ── */
        .edu-carousel-outer {
          position:relative; z-index:10;
          margin:0 clamp(24px,6vw,80px);
          overflow:hidden;
          /* height just tall enough for ring + card */
          height:400px;
        }
        .edu-carousel-inner {
          display:flex;
          gap:24px;
          width:100%;
          transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── Controls ── */
        .edu-controls {
          display:flex; align-items:center; justify-content:center;
          gap:18px; padding-top:20px;
          position:relative; z-index:10;
        }
        .edu-arrow {
          width:38px; height:38px; border-radius:50%;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.15);
          color:#e0deff; font-size:16px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:background 0.2s, opacity 0.2s;
        }
        .edu-arrow:not(:disabled):hover { background:rgba(128,77,238,0.3); border-color:#804dee88; }
        .edu-arrow:disabled { opacity:0.2; cursor:default; }
        .edu-dot {
          width:8px; height:8px; border-radius:50%; padding:0; cursor:pointer;
          border:1px solid rgba(255,255,255,0.25); background:transparent;
          transition:all 0.25s ease;
        }
        .edu-dot.on { transform:scale(1.5); }
      `}</style>

      <section
        ref={sectionRef}
        className="edu-section"
        id="education"
        tabIndex={0}
        aria-label="Education — drag, scroll, or use arrows to navigate stations"
      >
        <StarField />

        {/* Nebula */}
        <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", pointerEvents:"none", zIndex:0,
          width:380, height:280, top:"8%", left:"4%", background:"rgba(128,77,238,0.07)" }}/>
        <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", pointerEvents:"none", zIndex:0,
          width:300, height:220, bottom:"10%", right:"6%", background:"rgba(0,206,168,0.05)" }}/>

        {/* Heading */}
        <div style={{ position:"relative", zIndex:10, padding:"0 clamp(24px,6vw,80px) 0 8px", marginBottom:22 }}>
          <motion.div initial={{ opacity:0, y:-20 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }} viewport={{ once:true }}>
            <p className={styles.sectionSubText}>My academic journey</p>
            <h2 className={styles.sectionHeadText}>Education.</h2>
          </motion.div>
        </div>

        

        {/* Progress bar */}
        <div className="edu-prog-track">
          <div className="edu-prog-fill" style={{ width:`${(activeIdx / (N - 1)) * 100}%` }}/>
        </div>

        {/* Flight track + ship */}
        <div className="edu-track-wrap">
          <div className="edu-track-line"/>
          <div className="edu-track-end" style={{ left:0 }}/>
          <div className="edu-track-end" style={{ right:0 }}/>
          <div className="edu-ship" style={{ left: shipLeftPct }}>
            <Spaceship bob={bob}/>
          </div>
        </div>

        {/* Carousel: shows active card centered + half-visible cards on sides */}
        <div className="edu-carousel-outer" ref={containerRef}>
          <motion.div
            className="edu-carousel-inner"
            style={{ transform: `translateX(${translateX}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 40, mass: 1 }}
          >
            {educationData.map((item, i) => (
              <StationCard
                key={item.id}
                data={item}
                index={i}
                isActive={i === activeIdx}
                cardWidth={cardWidth}
              />
            ))}
          </motion.div>
        </div>

        
      </section>
    </>
  );
};

export default SectionWrapper(Education, "education");
