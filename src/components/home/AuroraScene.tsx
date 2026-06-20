"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---- shared GLSL: 3D simplex noise + fbm ---- */
const NOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.02; a*=0.5; } return v; }
`;

/* ---- aurora curtain (full-bleed backdrop) ---- */
const curtainVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }
`;
const curtainFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime; uniform vec2 uPointer;
${NOISE}
void main(){
  vec2 uv = vUv;
  float t = uTime * 0.06;
  // flowing field, drifting upward + waving with the cursor
  vec2 p = vec2(uv.x * 2.6 + uPointer.x * 0.5, uv.y * 1.4 - t);
  float n  = fbm(vec3(p, t * 0.7));
  float band = fbm(vec3(uv.x * 6.0 + n * 1.4, uv.y * 2.2 - t * 2.2, t * 1.3));
  float h = uv.y;
  vec3 cTeal    = vec3(0.20, 0.89, 0.77);
  vec3 cBlue    = vec3(0.42, 0.84, 1.00);
  vec3 cIndigo  = vec3(0.615, 0.545, 1.00);
  vec3 cMagenta = vec3(1.00, 0.37, 0.66);
  vec3 col = mix(cTeal, cBlue, smoothstep(-0.2, 0.4, h + n * 0.25));
  col = mix(col, cIndigo, smoothstep(0.25, 0.7, h + n * 0.2));
  col = mix(col, cMagenta, smoothstep(0.6, 1.05, h + band * 0.25));
  float curtain = smoothstep(0.15, 0.95, n * 0.6 + 0.5);
  float inten = pow(curtain, 1.6) * smoothstep(-0.25, 0.9, h) * (0.45 + 0.55 * band);
  // soft horizontal falloff so edges fade to black
  inten *= smoothstep(0.02, 0.30, uv.x) * smoothstep(0.98, 0.70, uv.x);
  vec3 base = vec3(0.02, 0.024, 0.055);
  gl_FragColor = vec4(base + col * inten * 0.85, 1.0);
}
`;

function Curtain() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const ptr = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }),
    []
  );
  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    ptr.current.lerp(state.pointer, 0.04);
    mat.current.uniforms.uPointer.value.copy(ptr.current);
  });
  // sit at the back, oversized to always fill the frame
  return (
    <mesh position={[0, 0, -6]} scale={[viewport.width * 2.4, viewport.height * 2.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={curtainVert}
        fragmentShader={curtainFrag}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---- holographic AI core (iridescent, cursor-reactive) ---- */
const coreVert = /* glsl */ `
uniform float uTime; uniform float uAmp;
varying vec3 vNormalW; varying vec3 vViewDir; varying float vN;
${NOISE}
void main(){
  float n = fbm(position * 1.3 + vec3(0.0, 0.0, uTime * 0.22));
  vN = n;
  vec3 displaced = position + normal * n * uAmp;
  vec4 world = modelMatrix * vec4(displaced, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;
const coreFrag = /* glsl */ `
precision highp float;
uniform float uTime;
varying vec3 vNormalW; varying vec3 vViewDir; varying float vN;
void main(){
  float fres = pow(1.0 - max(dot(vNormalW, vViewDir), 0.0), 2.2);
  // iridescent cycle across the aurora palette
  float phase = vN * 1.6 + uTime * 0.25 + fres * 2.0;
  vec3 cTeal    = vec3(0.20, 0.89, 0.77);
  vec3 cIndigo  = vec3(0.615, 0.545, 1.00);
  vec3 cMagenta = vec3(1.00, 0.37, 0.66);
  vec3 col = mix(cTeal, cIndigo, 0.5 + 0.5 * sin(phase));
  col = mix(col, cMagenta, 0.5 + 0.5 * sin(phase * 0.7 + 1.5));
  col *= 0.35 + fres * 1.5;          // dark core, bright rim
  gl_FragColor = vec4(col, 1.0);
}
`;

function Core() {
  const grp = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const ptr = useRef(new THREE.Vector2(0, 0));
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAmp: { value: 0.22 } }),
    []
  );
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (grp.current) {
      ptr.current.lerp(state.pointer, 0.05);
      grp.current.rotation.y += delta * 0.18;
      grp.current.rotation.x = ptr.current.y * 0.35;
      grp.current.rotation.z = -ptr.current.x * 0.2;
    }
  });
  return (
    <group ref={grp} position={[1.7, 0.15, 0.6]}>
      {/* solid iridescent body */}
      <mesh scale={1.15}>
        <icosahedronGeometry args={[1, 24]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={coreVert}
          fragmentShader={coreFrag}
        />
      </mesh>
      {/* holographic wireframe shell */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#9d8bff" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ---- steady starfield (no twinkle) ---- */
function Stars({ count = 480 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // deterministic spread (no Math.random — keeps it stable / SSR-safe)
      const a = i * 2.39996; // golden-angle
      const r = 4 + (i % 40) * 0.22;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a * 1.3) * r * 0.6;
      arr[i * 3 + 2] = -2 - ((i * 7) % 60) * 0.12;
    }
    return arr;
  }, [count]);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color="#c9d2ff"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

export default function AuroraScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // pause rendering when the canvas is scrolled offscreen (saves GPU / keeps
  // scrolling smooth)
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        onCreated={({ gl }) => gl.setClearColor("#05060e", 1)}
      >
        <color attach="background" args={["#05060e"]} />
        <Curtain />
        <Stars />
        <Core />
      </Canvas>
    </div>
  );
}
