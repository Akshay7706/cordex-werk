export const projectsData = [
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    category: 'Web App',
    description: 'A comprehensive admin panel featuring real-time data visualization, user management, and seamless performance.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    link: '/portfolio/saas-dashboard',
    challenge: 'Handling 1M+ data points in real-time while maintaining 60FPS on the frontend.',
    solution: 'Implemented a custom Web Worker-based data processing layer and high-performance WebGL chart rendering.',
    techStack: ['React', 'D3.js', 'WebWorkers', 'Tailwind', 'PostgreSQL'],
    results: [
      { label: 'Data Latency', value: '< 50ms' },
      { label: 'User Capacity', value: '100k+' },
      { label: 'Page Speed', value: '98/100' }
    ]
  },
  {
    id: 'aether-ai',
    title: 'Aether AI Studio',
    category: 'AI Tool Website',
    description: 'A dark-themed platform empowering creators to generate visuals using state-of-the-art machine learning models.',
    img: 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?auto=format&fit=crop&q=80&w=1200',
    link: '/portfolio/aether-ai',
    challenge: 'Designing a UI that feels as progressive as the generative AI models powering it.',
    solution: 'Built a cinematic Glassmorphic interface with custom Framer Motion drag-and-drop mechanics.',
    techStack: ['Next.js', 'Stable Diffusion API', 'Framer Motion', 'Supabase'],
    results: [
      { label: 'Conversion', value: '+40%' },
      { label: 'Visual Load', value: '< 1s' },
      { label: 'Engagement', value: '12m avg' }
    ]
  },
  {
    id: 'fintech-landing',
    title: 'FinTech Startup Landing',
    category: 'Website Structure',
    description: 'Conversion-driven landing page for a modern banking solution with integrated pricing modules.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
    link: '/portfolio/fintech-landing',
    challenge: 'Communicating security and trustworthiness while maintaining a disruptive, modern aesthetic.',
    solution: 'Used geometric "Vault" animations and high-contrast typography to emphasize reliability.',
    techStack: ['React', 'Three.js', 'Stripe API', 'Prisma'],
    results: [
      { label: 'Leads Gen', value: '25% increase' },
      { label: 'Trust Score', value: '9/10' },
      { label: 'Load Time', value: '0.8s' }
    ]
  },
  {
    id: 'nova-store',
    title: 'NOVA Hype E-Commerce',
    category: 'E-Commerce Platform',
    description: 'High-end monochrome retail experience featuring interactive sliding cart mechanics and seamless checkout mockups.',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
    link: '/portfolio/nova-store',
    challenge: 'Reinventing the checkout flow for mobile-native users in the fashion industry.',
    solution: 'Implemented a gesture-based "Hype" slider and monochromatic visual hierarchy.',
    techStack: ['Vite', 'Redux', 'Stripe', 'Node.js', 'Tailwind'],
    results: [
      { label: 'Mobile Sales', value: '+55%' },
      { label: 'Retention', value: '3x higher' },
      { label: 'UX Rating', value: 'Elite' }
    ]
  },
  {
    id: 'celestial-engine',
    title: 'Celestial 3D Engine',
    category: 'Interactive Experience',
    description: 'A cinematic, physics-based 3D environment powered by React Three Fiber and custom GLSL nebula shaders.',
    img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    challenge: 'Achieving a high-fidelity cinematic look while ensuring compatibility with mid-tier mobile browsers.',
    solution: 'Custom GLSL shaders with performance-optimized compute loops for particle attraction.',
    techStack: ['R3F', 'GLSL', 'Three.js', 'GSAP'],
    results: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Build Size', value: '450 KB' },
      { label: 'Stability', value: '100%' }
    ]
  }
];
