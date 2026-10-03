"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import './aether-flow-hero.css';

const AetherFlowHero = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 200 };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 4) + size * 2;
        let y = Math.random() * (canvas.height - size * 4) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(x, y, directionX, directionY, size, 'rgba(191, 128, 255, 0.8)'));
      }
    }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            let opacityValue = 1 - distance / 20000;
            let dx = particles[a].x - (mouse.x || 0);
            let dy = particles[a].y - (mouse.y || 0);
            let distMouse = Math.sqrt(dx * dx + dy * dy);
            ctx.strokeStyle =
              mouse.x && distMouse < mouse.radius
                ? `rgba(255, 255, 255, ${opacityValue})`
                : `rgba(200, 150, 255, ${opacityValue})`;
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
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
    };

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.2 + 0.5, duration: 0.8, ease: 'easeInOut' },
    }),
  };

  return (
    <div className="aether-hero">
      <canvas ref={canvasRef} className="aether-hero__canvas" />
      <div className="aether-hero__content">
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="aether-hero__badge">
          <Zap className="aether-hero__badge-icon" />
          <span>Dynamic Rendering Engine</span>
        </motion.div>

        <motion.h1 custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="aether-hero__title">
          Aether Flow
        </motion.h1>

        <motion.p custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="aether-hero__subtitle">
          An intelligent, adaptive framework for creating fluid digital experiences that
          feel alive and respond to user interaction in real-time.
        </motion.p>

        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
          <button className="aether-hero__cta">
            Explore the Engine
            <ArrowRight className="aether-hero__cta-icon" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AetherFlowHero;
