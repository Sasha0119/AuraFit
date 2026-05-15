import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Utensils, TrendingUp, Settings, Menu, X, Ghost } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
    { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { to: '/nutrition', icon: Utensils, label: 'Nutrition' },
    { to: '/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-lg lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-slate-950/50 backdrop-blur-md border-r border-slate-800/60 transition-transform duration-300 transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Ghost className="text-white fill-white" size={24} />
            </div>
            <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">AuraFit</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-slate-800/50 text-brand-primary border border-slate-700/50" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                )}
              >
                <item.icon size={20} className="shrink-0 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-900">
            <div className="px-4 py-4 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20">
              <p className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-2">Weekly Goal</p>
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-bold">4/5</span>
                <span className="text-xs text-slate-400 opacity-60">Sessions</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full w-[80%] shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
