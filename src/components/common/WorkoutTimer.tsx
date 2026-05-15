import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { formatTime } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TimerProps {
  duration?: number;
  onClose: () => void;
}

const WorkoutTimer: React.FC<TimerProps> = ({ duration = 60, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 p-6 rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center gap-6"
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="8" 
            strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - (timeLeft / duration))}
            strokeLinecap="round" transform="rotate(-90 50 50)"
            className="transition-all duration-1000 linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display font-bold">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            onClick={() => { setTimeLeft(duration); setIsActive(false); }}
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Rest Timer</p>
      </div>

      <button 
        onClick={onClose}
        className="absolute -top-2 -right-2 p-1 bg-zinc-800 border border-zinc-700 rounded-full hover:bg-zinc-700 text-white shadow-lg"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export default WorkoutTimer;
