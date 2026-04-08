import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Zap, Leaf } from 'lucide-react';

const hubs = [
  { 
    id: 'sp', 
    name: 'São Paulo', 
    x: 620, y: 780, 
    color: '#EAB308', 
    tag: 'HUB SP', 
    specialty: 'Conectividade Urbana',
    icon: Globe
  },
  { 
    id: 'cp', 
    name: 'Campinas', 
    x: 580, y: 740, 
    color: '#84cc16', 
    tag: 'HUB Campinas', 
    specialty: 'Inovação & P&D',
    icon: Zap
  },
  { 
    id: 'rj', 
    name: 'Rio de Janeiro', 
    x: 680, y: 760, 
    color: '#06b6d4', 
    tag: 'HUB RJ', 
    specialty: 'Economia Azul',
    icon: Leaf
  }
];

const RegionalMap = () => {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-leaf rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-primary/30" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary">Brasil Sustenta</span>
            <span className="h-[1px] w-8 bg-primary/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-foreground font-display tracking-tighter leading-[0.9]"
          >
            Rede de Inovação <span className="italic font-light text-primary">Eco-Tech</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-medium mt-8 leading-relaxed"
          >
            Conectando hubs de tecnologia sustentável para um futuro verde e inteligente no Brasil.
          </motion.p>
        </div>

        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full max-w-5xl mx-auto">
          {/* Brazil SVG Path (Simplified) */}
          <svg viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-[0_0_50px_rgba(34,197,94,0.1)]">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M480,50 L560,50 L640,80 L720,120 L780,180 L820,260 L840,360 L820,460 L780,560 L820,620 L800,700 L740,780 L680,840 L600,900 L500,940 L400,920 L300,880 L240,820 L180,740 L120,640 L80,540 L60,440 L80,340 L120,240 L180,160 L260,100 L360,60 L480,50 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              className="backdrop-blur-sm"
            />

            {/* Connecting Lines */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 3, delay: 1 }}
              d="M580,740 L620,780 M620,780 L680,760 M580,740 L680,760"
              fill="none"
              stroke="#84cc16"
              strokeWidth="1"
              strokeDasharray="5 5"
            />

            {/* Hub Glows */}
            {hubs.map((hub) => (
              <g key={hub.id}>
                <motion.circle
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  cx={hub.x}
                  cy={hub.y}
                  r="20"
                  fill={hub.color}
                  className="opacity-20 blur-xl"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <circle cx={hub.x} cy={hub.y} r="4" fill={hub.color} className="shadow-lg shadow-white" />
              </g>
            ))}
          </svg>

          {/* Cards (Desktop) */}
          {hubs.map((hub, idx) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + idx * 0.2 }}
              className="absolute hidden md:flex flex-col gap-3 p-4 bg-card/40 backdrop-blur-2xl border border-border rounded-2xl w-56 shadow-2xl"
              style={{ 
                left: hub.x > 500 ? `${(hub.x / 10)}%` : 'auto', 
                right: hub.x <= 500 ? `${100 - (hub.x / 10)}%` : 'auto',
                top: `${(hub.y / 10)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <hub.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-primary tracking-widest">{hub.tag}</div>
                  <div className="text-sm font-bold text-foreground">{hub.name}</div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-border" />
              <div className="text-[11px] text-muted-foreground/80 font-medium">{hub.specialty}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
