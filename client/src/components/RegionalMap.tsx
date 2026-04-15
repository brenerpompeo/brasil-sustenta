import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Zap, Leaf } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "/brazil-states.topo.json";

const hubs = [
  { 
    id: 'sp', 
    name: 'São Paulo', 
    coordinates: [-46.6333, -23.5505], 
    color: '#009444', 
    tag: 'HUB SP', 
    specialty: 'Conectividade Urbana',
    icon: Globe
  },
  { 
    id: 'cp', 
    name: 'Campinas', 
    coordinates: [-47.0608, -22.9099], 
    color: '#CCFF00', 
    tag: 'HUB Campinas', 
    specialty: 'Inovação & P&D',
    icon: Zap
  },
  { 
    id: 'rj', 
    name: 'Rio de Janeiro', 
    coordinates: [-43.1729, -22.9068], 
    color: '#0A0A0A', 
    tag: 'HUB RJ', 
    specialty: 'Economia Azul',
    icon: Leaf
  }
];

const RegionalMap = () => {
  return (
    <section className="relative py-32 bg-background overflow-hidden border-y border-border">
      {/* Background styling elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-foreground/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground">Brasil Sustenta</span>
            <span className="h-[1px] w-8 bg-foreground/20" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-foreground font-display tracking-tighter leading-[0.9]"
          >
            Operacao em polos <span className="italic font-light text-primary">regionais</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-foreground/70 text-lg md:text-xl font-medium mt-8 leading-relaxed"
          >
            A plataforma pode crescer por clusters universitarios e corporativos, com curadoria local e operacao conectada em rede.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 aspect-square relative drop-shadow-[0_0_50px_rgba(0,148,68,0.15)] bg-secondary/30 border border-border p-8"
          >
            <div className="absolute top-4 left-4 border border-foreground bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground z-10 w-max">
              MAPA // OPERACAO BRASIL
            </div>
            
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 750,
                center: [-53, -15] // Custom center for Brazil view
              }}
              className="w-full h-full outline-none"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="rgba(255,255,255,1)"
                      stroke="#0A0A0A"
                      strokeWidth={1.5}
                      style={{
                        default: { outline: "none", fill: "var(--background)", stroke: "var(--border)" },
                        hover: { fill: "rgba(0,148,68,0.1)", stroke: "#009444", strokeWidth: 2, outline: "none" },
                        pressed: { fill: "rgba(0,148,68,0.2)", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {/* Plot points on real coordinates */}
              {hubs.map(({ id, name, coordinates, color }) => (
                <Marker key={id} coordinates={coordinates as [number, number]}>
                  {/* Ripple effect */}
                  <circle r={18} fill={color} className="opacity-20 animate-ping origin-center" />
                  <circle r={12} fill={color} className="opacity-40 animate-pulse origin-center" />
                  {/* Core Marker */}
                  <circle r={6} fill={color} stroke="#FFFFFF" strokeWidth={2} />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{ fontFamily: "inherit", fill: "var(--foreground)", fontSize: "10px", fontWeight: "bold" }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </motion.div>

          {/* Cards Hub List Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-foreground/50 mb-4 border-b border-border pb-4">
              Polos Ativos
            </h3>
            
            {hubs.map((hub, idx) => (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-6 bg-background border border-border hover:border-primary transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-secondary group-hover:bg-primary/10 transition-colors border border-border">
                    <hub.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-primary tracking-widest mb-1">{hub.tag}</div>
                    <div className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{hub.name}</div>
                    <div className="text-sm text-foreground/60 font-medium">{hub.specialty}</div>
                  </div>
                </div>
                
                <div className="hidden sm:block">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary border border-primary px-3 py-1">Ativo</span>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-foreground text-background"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent">EXPANSÃO H2 2026</span>
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <p className="font-body text-sm text-background/80 font-medium">O modelo foi desenhado para abrir novos polos conforme universidades e empresas sejam homologadas na rede.</p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
