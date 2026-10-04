/**
 * LycorisFlower — a raw WebGL red-chrome spider lily, ported from the
 * LycorisSpecimen type specimen to a standalone background canvas.
 *
 * No external dependencies beyond React. Works as a full-bleed absolute
 * background: place it inside a `position:relative` container, set
 * `position:absolute; inset:0` on the wrapper and enjoy.
 *
 * Props:
 *   crimson   – flower colour (hex), default "#e3131b"
 *   florets   – umbel florets 3-8, default 6
 *   seed      – geometry seed, default 7
 *   alive     – idle sway + pointer tilt, default true
 *   offsetX   – clip-space horizontal offset of the heart (-1..1), default 0
 *   offsetY   – clip-space vertical offset of the heart (-1..1), default 0
 *   size      – flower radius as fraction of min(W,H), default 0.82
 *   elevation – camera elevation in degrees, default 12
 *   spin      – initial rotation in radians, default 0.2
 */

import { useEffect, useRef } from 'react'

// ── vector helpers ────────────────────────────────────────────────────────────
const add = (a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]]
const sub = (a, b) => [a[0]-b[0], a[1]-b[1], a[2]-b[2]]
const mul = (a, s) => [a[0]*s, a[1]*s, a[2]*s]
const dot = (a, b) =>  a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
const cross = (a, b) => [
  a[1]*b[2] - a[2]*b[1],
  a[2]*b[0] - a[0]*b[2],
  a[0]*b[1] - a[1]*b[0],
]
const norm = (a) => { const l = Math.hypot(a[0],a[1],a[2])||1; return [a[0]/l,a[1]/l,a[2]/l] }

// ── seeded random ─────────────────────────────────────────────────────────────
const rng = (seed) => {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t>>>15), t|1)
    t ^= t + Math.imul(t ^ (t>>>7), t|61)
    return ((t ^ (t>>>14)) >>> 0) / 4294967296
  }
}

const HEART = [0, 0.25, 0]

// ── build curves (procedural spider lily) ─────────────────────────────────────
function buildCurves(florets, seed) {
  const F = Math.max(3, Math.min(8, Math.round(florets)))
  const r = rng(seed)
  const curves = []
  const up = [0,1,0]

  for (let i = 0; i < F; i++) {
    const phi = (i/F)*Math.PI*2 + (r()-0.5)*0.3
    const tilt = 1.05 + (r()-0.5)*0.25
    const radial = [Math.cos(phi),0,Math.sin(phi)]
    const u = norm([Math.sin(tilt)*radial[0], Math.cos(tilt), Math.sin(tilt)*radial[2]])
    const base = [radial[0]*0.13, 0.07, radial[2]*0.13]
    const e1 = norm(cross(u, Math.abs(u[1])>0.9 ? [1,0,0] : up))
    const e2 = cross(u, e1)
    const stagger = i/F
    const common = { base, stagger }

    // pedicel
    const ped = []
    for (let k=0; k<=10; k++) {
      const s = k/10
      ped.push([radial[0]*0.13*s, 0.07*Math.sin((s*Math.PI)/2), radial[2]*0.13*s])
    }
    curves.push({ pts: ped, kind:2, w:0.022, t:0, lat:e1, twist:0, bulb:false, phase:0, ...common })

    for (let j=0; j<6; j++) {
      const th = (j/6)*Math.PI*2 + i*0.7 + (r()-0.5)*0.35
      const d = add(mul(e1, Math.cos(th)), mul(e2, Math.sin(th)))
      const lat = norm(cross(d, u))
      const phase = r()*Math.PI*2

      // tepal
      const L = 1.35 + r()*0.3
      const b0 = 0.45 + r()*0.2
      const b1 = 2.75 + r()*0.45
      const pts = [base]
      let p = base
      const steps = 48
      for (let k=1; k<=steps; k++) {
        const s = k/steps
        const b = b0 + (b1-b0)*Math.pow(s,1.2)
        p = add(p, mul(add(mul(d,Math.sin(b)), mul(u,Math.cos(b))), L/steps))
        pts.push(p)
      }
      for (let k=1; k<=steps; k++) {
        const s = k/steps
        pts[k] = add(pts[k], mul(lat, Math.sin(s*Math.PI*2.4+phase)*0.05*s))
      }
      curves.push({ pts, kind:0, w:0.075+r()*0.02, t:0.02, lat, twist:0.2+r()*0.35, bulb:false, phase, ...common })

      // stamen
      const d2 = add(mul(e1,Math.cos(th+0.52)), mul(e2,Math.sin(th+0.52)))
      const dh = norm([d2[0],0,d2[2]])
      const start = norm(add(u, mul(d2,0.25)))
      const end = norm(add(add(mul(radial,0.85), mul(dh,0.5)), [0,-0.95,0]))
      const Ls = 1.75 + r()*0.45
      const sp = [base]
      p = base
      for (let k=1; k<=44; k++) {
        const s = k/44
        const m = Math.pow(s,1.15)
        p = add(p, mul(norm(add(mul(start,1-m), mul(end,m))), Ls/44))
        sp.push(p)
      }
      curves.push({ pts:sp, kind:1, w:0.012, t:0, lat, twist:0, bulb:true, phase:phase+1.3, ...common })
    }

    // style
    {
      const endDir = norm(add(mul(radial,0.9), [0,-0.35,0]))
      const sp = [base]
      let p = base
      const Ls = 2.2 + r()*0.3
      for (let k=1; k<=44; k++) {
        const s = k/44
        p = add(p, mul(norm(add(mul(u,1-s), mul(endDir,s))), Ls/44))
        sp.push(p)
      }
      curves.push({ pts:sp, kind:1, w:0.009, t:0, lat:e1, twist:0, bulb:false, phase:r()*6, ...common })
    }
  }

  // scape
  const stem = []
  for (let k=0; k<=40; k++) {
    const s = k/40
    const y = 0.04 - s*4.6
    stem.push([Math.sin(s*2.2)*0.07, y, Math.sin(s*1.3)*0.03])
  }
  curves.push({ pts:stem, kind:2, w:0.05, t:0, lat:[1,0,0], twist:0, bulb:false, phase:0, stagger:0, base:[0,0,0] })

  let radius = 0
  for (const c of curves) {
    if (c.kind === 2) continue
    for (const q of c.pts) radius = Math.max(radius, Math.hypot(q[0]-HEART[0],q[1]-HEART[1],q[2]-HEART[2]))
  }
  return { curves, radius }
}

// ── build mesh ────────────────────────────────────────────────────────────────
const STRIDE = 13

function buildMesh(curves) {
  const v = []
  const idx = []
  let count = 0
  const push = (p, n, s, c) => {
    v.push(p[0],p[1],p[2], n[0],n[1],n[2], s, c.phase, c.kind, c.stagger, c.base[0],c.base[1],c.base[2])
    return count++
  }
  const tangent = (pts, i) =>
    norm(sub(pts[Math.min(i+1,pts.length-1)], pts[Math.max(i-1,0)]))

  for (const c of curves) {
    const n = c.pts.length
    if (c.kind === 0) {
      const rings = []
      let first=[], last=[], T0=[0,1,0], T1=[0,1,0]
      for (let i=0; i<n; i++) {
        const s = i/(n-1)
        const T = tangent(c.pts,i)
        let N = norm(cross(T, c.lat))
        let W = cross(N, T)
        const a = c.twist*Math.sin(Math.PI*s)
        const ca=Math.cos(a), sa=Math.sin(a)
        const W2 = add(mul(W,ca), mul(N,sa))
        N = sub(mul(N,ca), mul(W,sa))
        W = W2
        const hw = c.w*(0.42+0.58*Math.pow(Math.sin(Math.PI*Math.min(1,0.12+s*0.9)),0.6))
          *(1+0.1*Math.sin(s*34+c.phase))
        const p = c.pts[i]
        const k0=add(add(p,mul(W,hw)),mul(N,c.t))
        const k1=add(sub(p,mul(W,hw)),mul(N,c.t))
        const k2=sub(sub(p,mul(W,hw)),mul(N,c.t))
        const k3=sub(add(p,mul(W,hw)),mul(N,c.t))
        const mW=mul(W,-1), mN=mul(N,-1)
        rings.push([
          push(k0,N,s,c), push(k1,N,s,c),
          push(k1,mW,s,c), push(k2,mW,s,c),
          push(k2,mN,s,c), push(k3,mN,s,c),
          push(k3,W,s,c),  push(k0,W,s,c),
        ])
        if (i===0)   { first=[k0,k1,k2,k3]; T0=T }
        if (i===n-1) { last=[k0,k1,k2,k3];  T1=T }
      }
      for (let i=0; i<n-1; i++) {
        const a=rings[i], b=rings[i+1]
        for (let f=0; f<4; f++) { const x=f*2; idx.push(a[x],a[x+1],b[x],a[x+1],b[x+1],b[x]) }
      }
      const cap = (q, nrm, s) => {
        const o = q.map(p => push(p,nrm,s,c))
        idx.push(o[0],o[1],o[2],o[0],o[2],o[3])
      }
      cap(first, mul(T0,-1), 0)
      cap(last,  T1,         1)
    } else {
      const seg = c.kind===2 ? 10 : 6
      let N = norm(cross(tangent(c.pts,0), c.kind===2 ? [0,0,1] : c.lat))
      const rings = []
      for (let i=0; i<n; i++) {
        const s = i/(n-1)
        const T = tangent(c.pts,i)
        N = norm(sub(N, mul(T, dot(N,T))))
        const B = cross(T, N)
        let rad = c.w*(c.kind===1 ? 1-0.35*s : 1)
        if (c.bulb && s>0.9) rad = c.w*(0.65+2.1*Math.sin(((s-0.9)/0.1)*Math.PI*0.92))
        if (c.kind===1 && i===n-1) rad *= 0.3
        rings.push(count)
        for (let k=0; k<=seg; k++) {
          const a = (k/seg)*Math.PI*2
          const nr = add(mul(N,Math.cos(a)), mul(B,Math.sin(a)))
          push(add(c.pts[i], mul(nr,rad)), nr, s, c)
        }
      }
      for (let i=0; i<n-1; i++) {
        for (let k=0; k<seg; k++) {
          const a=rings[i]+k, b=rings[i+1]+k
          idx.push(a,a+1,b,a+1,b+1,b)
        }
      }
    }
  }
  return { data: new Float32Array(v), index: new Uint16Array(idx) }
}

// ── matrices ──────────────────────────────────────────────────────────────────
const perspective = (fovy, aspect, near, far) => {
  const f = 1/Math.tan(fovy/2)
  const m = new Float32Array(16)
  m[0]=f/aspect; m[5]=f
  m[10]=(far+near)/(near-far); m[11]=-1
  m[14]=(2*far*near)/(near-far)
  return m
}
const lookAt = (eye, at) => {
  const z=norm(sub(eye,at)), x=norm(cross([0,1,0],z)), y=cross(z,x)
  const m=new Float32Array(16)
  m[0]=x[0];m[4]=x[1];m[8]=x[2]
  m[1]=y[0];m[5]=y[1];m[9]=y[2]
  m[2]=z[0];m[6]=z[1];m[10]=z[2]
  m[12]=-dot(x,eye);m[13]=-dot(y,eye);m[14]=-dot(z,eye);m[15]=1
  return m
}
const multiply = (a, b) => {
  const o = new Float32Array(16)
  for (let c=0;c<4;c++)
    for (let r=0;r<4;r++)
      o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3]
  return o
}
const rotY = (t) => { const c=Math.cos(t),s=Math.sin(t); return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]) }
const rotX = (t) => { const c=Math.cos(t),s=Math.sin(t); return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]) }

const hexToLinear = (hex) => {
  let h = hex.replace('#','').trim()
  if (h.length===3) h=h.split('').map(c=>c+c).join('')
  const n = parseInt(h.slice(0,6),16)
  if (Number.isNaN(n)) return [0.8,0.02,0.03]
  const ch = (v) => Math.pow(v/255,2.2)
  return [ch((n>>16)&255), ch((n>>8)&255), ch(n&255)]
}

// ── shaders ───────────────────────────────────────────────────────────────────
const VERT = `
attribute vec3 a_pos;
attribute vec3 a_nrm;
attribute vec4 a_aux;
attribute vec3 a_base;
uniform mat4 u_vp;
uniform mat4 u_model;
uniform vec2 u_offset;
uniform float u_time;
uniform float u_bloom;
uniform float u_sway;
uniform float u_stem;
varying vec3 v_n;
varying vec3 v_w;
varying float v_s;
void main() {
  vec3 p = a_pos;
  float k = a_aux.z;
  if (k < 1.5) {
    float g = clamp(u_bloom * 1.6 - a_aux.w * 0.6, 0.0, 1.0);
    g = 1.0 - pow(1.0 - g, 3.0);
    p = a_base + (p - a_base) * g;
    float amp = (k < 0.5 ? 0.03 : 0.06) * u_sway * a_aux.x * a_aux.x;
    p += amp * vec3(
      sin(u_time * 0.9  + a_aux.y),
      0.5 * sin(u_time * 1.3 + a_aux.y * 1.7),
      cos(u_time * 0.7  + a_aux.y * 1.3)
    );
  } else if (p.y < 0.0) {
    p.y *= u_stem;
  }
  vec4 w = u_model * vec4(p, 1.0);
  v_w = w.xyz;
  v_n = (u_model * vec4(a_nrm, 0.0)).xyz;
  v_s = a_aux.x;
  gl_Position = u_vp * w;
  gl_Position.xy += u_offset * gl_Position.w;
}
`

const FRAG = `
precision highp float;
uniform vec3 u_eye;
uniform vec3 u_red;
uniform vec3 u_hot;
uniform float u_alpha;
varying vec3 v_n;
varying vec3 v_w;
varying float v_s;
float studio(vec3 r) {
  float key   = pow(max(dot(r, normalize(vec3(-0.45, 0.85, 0.35))), 0.0), 14.0) * 2.6;
  float strip = smoothstep(0.55, 0.8,  r.x)  * smoothstep(-0.7, 0.3, r.y) * 1.4;
  float rim   = smoothstep(0.55, 0.95,-r.z)  * smoothstep(-0.2, 0.5, r.y) * 0.9;
  float hz    = exp(-abs(r.y - 0.05) * 7.0) * 0.4;
  return key + strip + rim + hz;
}
void main() {
  vec3 n = normalize(v_n);
  vec3 v = normalize(u_eye - v_w);
  if (dot(n, v) < 0.0) n = -n;
  vec3 r  = reflect(-v, n);
  float e  = studio(r);
  float fr = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  float dif = max(dot(n, normalize(vec3(-0.3, 0.8, 0.6))), 0.0);
  vec3 col  = u_red * (0.04 + 0.22 * dif);
  col += u_red * e * 1.15;
  col += u_hot * pow(e, 3.0) * 0.3;
  col += u_red * fr * 1.1;
  col *= 0.8 + 0.2 * smoothstep(0.0, 0.25, v_s);
  col  = col / (1.0 + col);
  col  = pow(col, vec3(1.0 / 2.2));
  gl_FragColor = vec4(col * u_alpha, u_alpha);
}
`

// ── component ─────────────────────────────────────────────────────────────────
export default function LycorisFlower({
  crimson  = '#e3131b',
  florets  = 6,
  seed     = 7,
  alive    = true,
  offsetX  = 0,
  offsetY  = 0.08,
  size     = 0.82,
  elevation = 12,
  spinInit = 0.2,
  stemFrac = 0.55,
}) {
  const canvasRef = useRef(null)
  // keep mutable values accessible inside the rAF loop without re-creating it
  const liveRef = useRef({ crimson, alive, florets, seed })
  liveRef.current = { crimson, alive, florets, seed }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { curves, radius } = buildCurves(florets, seed)
    const mesh = buildMesh(curves)

    // ── WebGL init ──────────────────────────────────────────────────────────
    let gl   = null
    let prog = null
    let vbo  = null
    let ibo  = null
    const loc = {}

    const initGL = () => {
      gl = canvas.getContext('webgl', { alpha:true, antialias:true, premultipliedAlpha:true })
      if (!gl) return false
      const compile = (type, src) => {
        const sh = gl.createShader(type)
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null
      }
      const vs = compile(gl.VERTEX_SHADER,   VERT)
      const fs = compile(gl.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) return false
      prog = gl.createProgram()
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
      gl.useProgram(prog)
      vbo = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
      gl.bufferData(gl.ARRAY_BUFFER, mesh.data, gl.STATIC_DRAW)
      ibo = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.index, gl.STATIC_DRAW)
      const attr = (name, size, off) => {
        const a = gl.getAttribLocation(prog, name)
        if (a < 0) return
        gl.enableVertexAttribArray(a)
        gl.vertexAttribPointer(a, size, gl.FLOAT, false, STRIDE*4, off*4)
      }
      attr('a_pos', 3, 0)
      attr('a_nrm', 3, 3)
      attr('a_aux', 4, 6)
      attr('a_base',3,10)
      for (const n of ['u_vp','u_model','u_offset','u_time','u_bloom','u_sway','u_stem','u_eye','u_red','u_hot','u_alpha'])
        loc[n] = gl.getUniformLocation(prog, n)
      gl.enable(gl.DEPTH_TEST)
      gl.clearColor(0,0,0,0)
      return true
    }
    if (!initGL()) { gl = null }

    const onLost = (e) => { e.preventDefault(); gl = null }
    const onRestored = () => { if (!initGL()) gl = null }
    canvas.addEventListener('webglcontextlost',      onLost)
    canvas.addEventListener('webglcontextrestored',  onRestored)

    // ── sizing ──────────────────────────────────────────────────────────────
    let W = 1, H = 1, dpr = 1
    const resize = () => {
      const p = canvas.parentElement || canvas
      W = Math.max(1, p.clientWidth)
      H = Math.max(1, p.clientHeight)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement || canvas)
    resize()

    // ── pointer tilt ────────────────────────────────────────────────────────
    const ptr = { x:0, y:0, tx:0, ty:0 }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      ptr.tx = ((e.clientX - r.left) / r.width)  * 2 - 1
      ptr.ty = ((e.clientY - r.top)  / r.height) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    // ── render loop ─────────────────────────────────────────────────────────
    let raf = 0
    let last = performance.now()
    const born = last
    let time = 0
    let spin = spinInit
    let spinVel = 0

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const L = liveRef.current

      const moving = L.alive
      if (moving) {
        time += dt
        spin += spinVel + dt * 0.12
        spinVel *= Math.exp(-dt * 2.5)
        ptr.x += (ptr.tx - ptr.x) * (1 - Math.exp(-dt * 4))
        ptr.y += (ptr.ty - ptr.y) * (1 - Math.exp(-dt * 4))
      }

      if (!gl || !prog) return
      const g = gl

      // camera
      const fov = (30 * Math.PI) / 180
      const minDim = Math.min(W, H)
      const dist = (radius * H) / (size * minDim * Math.tan(fov / 2))
      const el   = Math.max(-88, Math.min(88, elevation + ptr.y * 9)) * (Math.PI / 180)
      const eye  = [HEART[0], HEART[1] + Math.sin(el)*dist, HEART[2] + Math.cos(el)*dist]
      const proj = perspective(fov, W/H, Math.max(0.05, dist-6), dist+8)
      const vp   = multiply(proj, lookAt(eye, HEART))
      const model= multiply(rotY(spin + ptr.x * 0.35), rotX(ptr.y * 0.05))
      const bloom= Math.min(1, (now - born) / 2600)
      const red  = hexToLinear(L.crimson)

      g.viewport(0, 0, canvas.width, canvas.height)
      g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT)
      g.uniformMatrix4fv(loc.u_vp,    false, vp)
      g.uniformMatrix4fv(loc.u_model, false, model)
      g.uniform2f(loc.u_offset, offsetX, offsetY)
      g.uniform1f(loc.u_time,   time)
      g.uniform1f(loc.u_bloom,  bloom)
      g.uniform1f(loc.u_sway,   moving ? 1 : 0)
      g.uniform1f(loc.u_stem,   stemFrac)
      g.uniform3f(loc.u_eye,    eye[0], eye[1], eye[2])
      g.uniform3f(loc.u_red,    red[0]*2.2, red[1]*2.2, red[2]*2.2)
      g.uniform3f(loc.u_hot,    1, 0.55+red[1], 0.5+red[2])
      g.uniform1f(loc.u_alpha,  1)
      g.drawElements(g.TRIANGLES, mesh.index.length, g.UNSIGNED_SHORT, 0)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('webglcontextlost',     onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      if (gl) {
        gl.deleteBuffer(vbo)
        gl.deleteBuffer(ibo)
        gl.deleteProgram(prog)
      }
    }
  // Rebuild only when geometry props change (not crimson — that's read live)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [florets, seed, spinInit, offsetX, offsetY, size, elevation, stemFrac])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        pointerEvents: 'none',
      }}
    />
  )
}
