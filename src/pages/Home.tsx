import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Flame, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { state } = useApp();
  const needsProfile = !state.profile;

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 lg:p-16 shadow-2xl shadow-brand-primary/10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-brand-primary/20 blur-[120px]" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-3 py-1 bg-brand-primary/20 border border-brand-primary/30 rounded-full text-brand-primary text-xs font-bold w-fit mb-6"
          >
            <Sparkles size={14} />
            <span>AI-POWERED FITNESS REVOLUTION</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[0.9] text-white">
            UNLOCK YOUR <span className="text-slate-500 italic">LIMITLESS</span> POTENTIAL.
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            Experience the next generation of fitness coaching. Personalized AI workouts, real-time tracking, and nutrition precision—all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to={needsProfile ? "/settings" : "/dashboard"}>
              <button className="h-14 px-8 rounded-2xl bg-white text-slate-950 font-bold flex items-center gap-2 hover:scale-[1.05] transition-all shadow-xl shadow-white/10">
                <span>{needsProfile ? "Setup Profile" : "Open Dashboard"}</span>
                <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/workouts">
              <button className="h-14 px-8 rounded-2xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-colors">
                Explore Workouts
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <Flame size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display">{state.today.caloriesBurned} kcal</h3>
            <p className="text-slate-500 font-medium font-bold uppercase tracking-widest text-[10px]">Burned Today</p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display">{state.today.steps} / 10k</h3>
            <p className="text-slate-500 font-medium font-bold uppercase tracking-widest text-[10px]">Daily Steps</p>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-brand-accent flex items-center justify-center">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display">{state.workouts.length}</h3>
            <p className="text-slate-500 font-medium font-bold uppercase tracking-widest text-[10px]">Total Workouts</p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-display mb-4">Precision Nutrition</h2>
          <p className="text-slate-400 mb-6">Our AI analyzes your metabolism to suggest the perfect macro balance for your specific goals.</p>
          <Link to="/nutrition" className="text-brand-primary font-bold flex items-center gap-2 group">
            <span>View Meal Plan</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="aspect-video rounded-[2rem] bg-slate-900 border border-slate-800 overflow-hidden relative group">
          <img 
            src="https://picsum.photos/seed/fit-man/800/600" 
            alt="Workout" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-xl font-bold mb-1 text-white">AI Coach Suggestions</h3>
            <p className="text-slate-400 text-sm">Tap into data-driven training</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
