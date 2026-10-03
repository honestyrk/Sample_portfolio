import { useEffect, useRef } from 'react';

/**
 * useParticleCanvas
 * Attaches an interactive particle-network animation to a <canvas> element.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {object} opts
 * @param {string}  [opts.particleColor='rgba(191,128,255,0.8)']
 * @param {string}  [opts.lineColorBase='rgba(200,150,255,{o})']
 * @param {string}  [opts.lineColorHover='rgba(255,255,255,{o})']
 * @param {string}  [opts.bgColor='rgba(5,2,12,0.92)']  - canvas fill
 * @param {number}  [opts.density=9000]   - lower = more particles
 * @param {number}  [opts.mouseRadius=150]
 */
export function useParticleCanvas(canvasRef, opts = {}) {
  const {
    particleColor = 'rgba(191, 128, 255, 0.8)',
    bgColor = 'rgba(5, 2, 12, 0.94)',
    density = 9000,
    mouseRadius = 150,
  } = opts;

  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId;
    let particles = [];

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y;
        this.dx = dx; this.dy = dy;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        const mx = mouse.current.x;
        const my = mouse.current.y;
        if (mx !== null && my !== null) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius + this.size) {
            const force = (mouseRadius - dist) / mouseRadius;
            this.x -= (dx / dist) * force * 5;
            this.y -= (dy / dist) * force * 5;
          }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / density);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        particles.push(new Particle(
          Math.random() * (canvas.width - size * 4) + size * 2,
          Math.random() * (canvas.height - size * 4) + size * 2,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          size,
        ));
      }
    };

    const connect = () => {
      const threshold = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist2 =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;
          if (dist2 < threshold) {
            const opacity = 1 - dist2 / 20000;
            const mx = mouse.current.x;
            const my = mouse.current.y;
            const dxm = particles[a].x - (mx || 0);
            const dym = particles[a].y - (my || 0);
            const nearMouse = mx !== null && Math.sqrt(dxm * dxm + dym * dym) < mouseRadius;
            ctx.strokeStyle = nearMouse
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(200, 150, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.current.x = null; mouse.current.y = null; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [canvasRef, particleColor, bgColor, density, mouseRadius]);
}
