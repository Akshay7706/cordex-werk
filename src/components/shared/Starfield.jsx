import React, { useRef, useEffect } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        drift: (Math.random() - 0.5) * 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw subtle background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#050B14');
      grad.addColorStop(1, '#0B1C2C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        // Update positions
        star.y -= star.speed;
        star.x += star.drift;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Pulsating opacity effect
        const currentOpacity = star.opacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.001 * star.speed * 10));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        
        ctx.fill();
        
        // Slight glow for bigger stars
        if (star.radius > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
