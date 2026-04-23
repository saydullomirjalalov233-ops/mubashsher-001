import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { GAMES } from '../constants';
import { GameCategory, GameInfo } from '../types';

interface DashboardProps {
  onSelectGame: (game: GameInfo) => void;
}

const CATEGORIES: GameCategory[] = ['Arcade', 'Boshqotirma', 'Mantiq', 'Tezkorlik', 'Tasodif'];

const BORDER_COLORS = [
  'border-vibrant-red',
  'border-vibrant-blue',
  'border-vibrant-green',
  'border-vibrant-purple',
  'border-vibrant-orange',
  'border-vibrant-teal'
];

export default function Dashboard({ onSelectGame }: DashboardProps) {
  const [filter, setFilter] = useState<GameCategory | 'Barchasi'>('Barchasi');

  const filteredGames = filter === 'Barchasi' 
    ? GAMES 
    : GAMES.filter(g => g.category === filter);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center overflow-x-hidden">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center bg-white p-0 rounded-[40px] shadow-[0_12px_0_#E5C12D] mb-12 gap-0 overflow-hidden relative"
      >
        <div className="flex flex-col md:flex-row items-center w-full">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="w-full md:w-1/3 h-64 md:h-80 overflow-hidden"
          >
            <img 
              src="https://tse3.mm.bing.net/th/id/OIP.seej6F9INLM3AQJxyb_Q_gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="flex-1 px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              x: { delay: 0.5, duration: 0.8, type: "spring" },
              opacity: { delay: 0.5 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            className="text-4xl sm:text-7xl font-[1000] text-vibrant-red tracking-tighter leading-tight text-center md:text-left drop-shadow-xl"
          >
            NAJOT TA'LIM
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: 1 
            }}
            transition={{ 
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              opacity: { delay: 0.7 }
            }}
            className="flex gap-5"
          >
              <div className="bg-[#F0F0F0] px-6 py-3 rounded-2xl font-black text-xs sm:text-sm text-vibrant-blue tracking-widest uppercase shadow-sm">31 TA O'YIN TAYYOR</div>
              <div className="bg-[#F0F0F0] px-6 py-3 rounded-2xl font-black text-xs sm:text-sm text-vibrant-green tracking-widest uppercase shadow-sm">1.2M O'YINCHI</div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-7xl flex flex-wrap justify-center gap-3 mb-10"
      >
        <button
          onClick={() => setFilter('Barchasi')}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_0_#D9D9D9] active:shadow-none active:translate-y-1 ${
            filter === 'Barchasi' ? 'bg-vibrant-red text-white shadow-[0_4px_0_#C94C4C]' : 'bg-white text-zinc-800'
          }`}
        >
          ASOSIY
        </button>
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_0_#D9D9D9] active:shadow-none active:translate-y-1 ${
              filter === cat ? 'bg-vibrant-red text-white shadow-[0_4px_0_#C94C4C]' : 'bg-white text-zinc-800'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </motion.nav>

      <motion.div 
        layout
        className="w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game, idx) => {
            const IconComponent = (Icons as any)[game.icon] || Icons.Gamepad2;
            const borderColorClass = BORDER_COLORS[idx % BORDER_COLORS.length];
            
            return (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectGame(game)}
                className={`flex flex-col items-center justify-center bg-white p-4 rounded-2xl border-t-[3px] border-x-[3px] border-b-[8px] ${borderColorClass} cursor-pointer transition-transform`}
              >
                <div className="text-3xl mb-2">
                   <IconComponent className={`w-8 h-8 ${game.color.replace('bg-', 'text-')}`} />
                </div>
                <motion.h3 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, ease: "easeInOut" }}
                  className="text-[11px] font-[900] text-zinc-800 uppercase leading-tight text-center tracking-tight"
                >
                  {game.title}
                </motion.h3>
                <div className="mt-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{game.category}</div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-auto py-8 text-vibrant-shadow font-black uppercase text-xs tracking-widest">
        &copy; 2026 SUPER O'YINLAR MARKAZI
      </footer>
    </div>
  );
}
