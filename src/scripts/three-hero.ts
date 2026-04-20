// ─────────────────────────────────────────────────────────────────────────────
// THREE.JS HERO SCENE
// Dos capas sobre el canvas:
//   1. FONDO: shader GLSL con foto en B&W + glitch
//      La imagen se comporta como object-fit:cover centrada —
//      siempre cubre todo el canvas manteniendo proporciones.
//   2. GEOMETRÍA 3D: modelo GLB (public/3d/ext.glb) wireframe + MeshNormal,
//      parallax con el mouse
//
// Para CAMBIAR LA FOTO: reemplazar /images/perfil.png (mismo nombre)
// Para CAMBIAR EL MODELO 3D: reemplazar /3d/ext.glb (mismo nombre)
// Para AJUSTAR FRECUENCIA del glitch: buscar "INTERVALO" más abajo
// ─────────────────────────────────────────────────────────────────────────────

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function initHeroScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor(0x1a1a1a, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3);

  // ── Textura ──────────────────────────────────────────────────────────────────
  const bgGeo  = new THREE.PlaneGeometry(2, 2);
  const loader = new THREE.TextureLoader();

  const uniforms = {
    uTexture:      { value: new THREE.Texture() },
    uTime:         { value: 0.0 },
    uGlitch:       { value: 0.0 },
    // Aspect ratios para calcular object-fit:cover en el shader
    uImageAspect:  { value: 1.0 },                                   // ancho/alto de la foto
    uCanvasAspect: { value: canvas.clientWidth / canvas.clientHeight }, // ancho/alto del canvas
    uOffsetX:      { value: -0.12 },  // desplaza la foto a la derecha (+derecha = valor negativo)
  };

  // Carga la imagen y actualiza el aspect ratio cuando termine
  // BASE_URL puede venir sin trailing slash — se fuerza el separador
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  loader.load(`${base}images/perfil.png`, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    uniforms.uTexture.value     = texture;
    uniforms.uImageAspect.value = texture.image.width / texture.image.height;
    // Avisar al loader que la textura del hero ya está lista
    window.dispatchEvent(new CustomEvent('hero-texture-loaded'));
  });

  const bgMat = new THREE.ShaderMaterial({
    uniforms,
    depthWrite: false,
    depthTest:  false,

    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }
    `,

    fragmentShader: /* glsl */`
      uniform sampler2D uTexture;
      uniform float     uTime;
      uniform float     uGlitch;
      uniform float     uImageAspect;   // proporción de la foto (ancho / alto)
      uniform float     uCanvasAspect;  // proporción del canvas (ancho / alto)
      uniform float     uOffsetX;       // desplazamiento horizontal del encuadre
      varying vec2      vUv;

      float rand(vec2 co)  { return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
      float rand1(float x) { return fract(sin(x * 127.1) * 43758.5453); }

      void main() {
        // ── object-fit: cover centrado ────────────────────────────────────────
        // Ajusta los UV para que la imagen siempre llene el canvas completo
        // manteniendo sus proporciones — igual que CSS object-fit:cover.
        //
        // Si el canvas es más ancho que la imagen: escala por ancho, recorta arriba/abajo
        // Si el canvas es más alto que la imagen:  escala por alto,  recorta los lados
        vec2 uv = vUv;

        float scaleX = min(uCanvasAspect / uImageAspect, 1.0);
        float scaleY = min(uImageAspect / uCanvasAspect, 1.0);
        uv.x = (uv.x - 0.5) * scaleX + 0.5 + uOffsetX;
        uv.y = (uv.y - 0.5) * scaleY + 0.5;

        // ── Glitch grueso: bloques horizontales ───────────────────────────────
        float bY = floor(uv.y * 12.0) / 12.0;
        float bN = rand(vec2(bY, floor(uTime * 14.0)));
        uv.x    += step(0.80, bN) * uGlitch * (rand(vec2(bY, uTime)) - 0.5) * 0.45;

        // ── Glitch fino: slices ───────────────────────────────────────────────
        float sY = floor(uv.y * 48.0) / 48.0;
        float sN = rand(vec2(sY, floor(uTime * 18.0)));
        uv.x    += uGlitch * (sN - 0.5) * 0.18;

        // ── Vertical roll ─────────────────────────────────────────────────────
        float roll = uGlitch * step(0.92, rand1(floor(uTime * 6.0))) * 0.08;
        uv.y       = fract(uv.y + roll);
        uv         = clamp(uv, 0.0, 1.0);

        // ── RGB split ─────────────────────────────────────────────────────────
        float split = uGlitch * 0.022;
        float r = texture2D(uTexture, vec2(min(uv.x + split, 1.0), uv.y)).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, vec2(max(uv.x - split, 0.0), uv.y)).b;

        // ── B&W ───────────────────────────────────────────────────────────────
        float luma = 0.2126*r + 0.7152*g + 0.0722*b;
        vec3  col  = mix(vec3(luma), vec3(r,g,b), uGlitch * 0.35);

        // ── Scanlines ─────────────────────────────────────────────────────────
        col -= sin(vUv.y * 600.0) * mix(0.015, 0.05, uGlitch);

        // ── Ruido estático ────────────────────────────────────────────────────
        float noise = rand(uv * vec2(uTime * 43.0, uTime * 71.0));
        col += uGlitch * step(0.85, noise) * 0.5;

        // ── Viñeta ────────────────────────────────────────────────────────────
        vec2  fc  = vUv - 0.5;
        float vig = 1.0 - dot(fc, fc) * 2.0;
        col      *= clamp(vig, 0.0, 1.0);

        col *= 0.72;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  const bgScene  = new THREE.Scene();
  const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  bgScene.add(new THREE.Mesh(bgGeo, bgMat));

  // ── Iluminación para los materiales del GLB ──────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 1.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
  dirLight.position.set(2, 3, 4);
  scene.add(dirLight);

  // ── Geometría 3D flotante — DESHABILITADO temporalmente ──────────────────────
  // Para re-activar: cambiar SHOW_3D a true
  const SHOW_3D = false;
  const TARGET_SIZE = 0.116;
  let outerGroup: THREE.Group | null = null;
  let innerGroup: THREE.Group | null = null;

  const gltfLoader = new GLTFLoader();
  if (SHOW_3D) gltfLoader.load(`${base}3d/ext.glb`, (gltf) => {
    // Calcular bounding box para normalizar el tamaño
    const box    = new THREE.Box3().setFromObject(gltf.scene);
    const size   = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale  = maxDim > 0 ? TARGET_SIZE / maxDim : 1;

    // Grupo exterior: wireframe blanco
    outerGroup = new THREE.Group();
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const geo = (child as THREE.Mesh).geometry.clone();
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 });
        outerGroup!.add(new THREE.Mesh(geo, mat));
      }
    });
    outerGroup.scale.setScalar(scale);
    outerGroup.position.set(1.4, -0.9, 0);
    scene.add(outerGroup);

    // Grupo interior: materiales/texturas originales del GLB, ~56% del tamaño
    innerGroup = new THREE.Group();
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh    = child as THREE.Mesh;
        const geo     = mesh.geometry.clone();
        // Clonar material original para no mutar el asset cargado
        const srcMat  = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
        const mat     = srcMat.clone();
        innerGroup!.add(new THREE.Mesh(geo, mat));
      }
    });
    innerGroup.scale.setScalar(scale * 0.34);
    innerGroup.position.set(1.4, -0.9, 0);
    scene.add(innerGroup);
  });

  // ── Mouse parallax ───────────────────────────────────────────────────────────
  const mouse     = new THREE.Vector2();
  const targetRot = new THREE.Vector2();
  function onMouseMove(e: MouseEvent) {
    mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('mousemove', onMouseMove);

  // ── Sistema de glitch ────────────────────────────────────────────────────────
  let glitchTimer    = 0;
  let glitchDuration = 0;
  let burstCount     = 0;
  let isGlitching    = false;

  function triggerGlitch() {
    isGlitching    = true;
    glitchDuration = 0.06 + Math.random() * 0.18;
    burstCount     = Math.floor(Math.random() * 2) + 1;
    glitchTimer    = 0;
  }

  const clock = new THREE.Clock();
  let animId: number;

  function animate() {
    animId = requestAnimationFrame(animate);
    const dt = clock.getDelta();
    uniforms.uTime.value += dt;

    // INTERVALO: glitch cada 2–4 segundos al azar
    glitchTimer += dt;
    if (!isGlitching && glitchTimer > 10.0 + Math.random() * 5.0) {
      triggerGlitch();
    }

    if (isGlitching) {
      glitchDuration -= dt;
      if (glitchDuration > 0) {
        uniforms.uGlitch.value = 1.0;
      } else {
        uniforms.uGlitch.value = 0.0;
        burstCount--;
        if (burstCount > 0) {
          glitchDuration = 0.04 + Math.random() * 0.08;
        } else {
          isGlitching = false;
        }
      }
    }

    // Rotación 3D + parallax del mouse
    targetRot.x += (mouse.y * 0.3 - targetRot.x) * 0.05;
    targetRot.y += (mouse.x * 0.5 - targetRot.y) * 0.05;
    const t = uniforms.uTime.value;
    if (outerGroup) {
      outerGroup.rotation.x =  targetRot.x * 0.4 + t * 0.025;
      outerGroup.rotation.y =  targetRot.y * 0.4 + t * 0.035;
    }
    if (innerGroup) {
      innerGroup.rotation.x = -targetRot.x * 0.4 + t * 0.018;
      innerGroup.rotation.y = -targetRot.y * 0.4 + t * 0.028;
    }

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(bgScene, bgCamera);
    renderer.render(scene, camera);
  }

  animate();

  // ── Resize: actualiza canvas aspect y tamaño del renderer ────────────────────
  function onResize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uCanvasAspect.value = w / h; // recalcular cover al cambiar tamaño
  }
  window.addEventListener('resize', onResize);

  // Cleanup para Astro View Transitions
  function disposeGroup(group: THREE.Group | null) {
    if (!group) return;
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.dispose();
        (Array.isArray(mesh.material) ? mesh.material : [mesh.material])
          .forEach((m) => m.dispose());
      }
    });
  }

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    bgMat.dispose();
    bgGeo.dispose();
    disposeGroup(outerGroup);
    disposeGroup(innerGroup);
  };
}
