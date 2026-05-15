import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Plus, Sparkles, Clock, Map, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { Workout, Exercise } from '../types';
import { cn } from '../lib/utils';

const Workouts = () => {
  const { state, addWorkout, completeExercise } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'ai'>('all');

  const handleGenerateAIWorkout = async () => {
    if (!state.profile) {
      alert("Please setup your profile first!");
      return;
    }
    
    setIsGenerating(true);
    const data = await geminiService.getWorkoutPlan(
      state.profile.goal,
      state.profile.activityLevel,
      state.profile.gender
    );
    
    if (data && data.plan) {
      const firstDay = data.plan[0];
      const newWorkout: Workout = {
        id: Math.random().toString(36).substr(2, 9),
        title: `AI: ${firstDay.title}`,
        date: new Date().toISOString().split('T')[0],
        type: 'AI Suggestion',
        exercises: firstDay.exercises.map((e: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: e.name,
          sets: e.sets,
          reps: e.reps,
          duration: e.duration,
          intensity: e.intensity || 'medium',
          completed: false
        }))
      };
      addWorkout(newWorkout);
    }
    setIsGenerating(false);
  };

  const categories = [
    { name: 'Strength', img: 'https://picsum.photos/seed/strength/400/300' },
    { name: 'Cardio', img: 'https://picsum.photos/seed/cardio/400/300' },
    { name: 'Yoga', img: 'https://picsum.photos/seed/yoga/400/300' },
    { name: 'HIIT', img: 'https://picsum.photos/seed/hiit/400/300' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-bold text-white">Training Hub</h1>
          <p className="text-slate-500 font-medium">Ready to break some PB's today?</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleGenerateAIWorkout}
            disabled={isGenerating}
            className="h-12 px-6 rounded-2xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30 font-bold flex items-center gap-2 hover:bg-brand-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={20} />
              </motion.div>
            ) : <Sparkles size={20} />}
            <span>{isGenerating ? 'Analyzing...' : 'AI Suggestion'}</span>
          </button>
          <button className="h-12 px-6 rounded-2xl bg-white text-slate-950 font-bold flex items-center gap-2 hover:scale-[1.05] transition-all shadow-xl shadow-white/10">
            <Plus size={20} />
            <span>Create Plan</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-900 pb-1">
        {['all', 'custom', 'ai'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-4 py-2 text-sm font-bold capitalize transition-all relative",
              activeTab === tab ? "text-brand-primary" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold font-display mb-6 text-white text-gradient">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button key={cat.name} className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <p className="text-white font-bold">{cat.name}</p>
                <div className="h-0.5 w-0 group-hover:w-full bg-brand-primary transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* My Plans / Active Workouts */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-display text-white">Your Active Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {state.workouts.map((workout) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-6 group shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                      <Dumbbell size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">{workout.title}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{workout.type}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-colors">
                    <ChevronRight size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-3">
                  {workout.exercises.map((ex) => (
                    <div key={ex.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                      <div className="flex items-center gap-3">
                         {ex.completed ? (
                           <CheckCircle2 size={18} className="text-brand-accent shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
                         ) : (
                           <button 
                             onClick={() => completeExercise(workout.id, ex.id)}
                             className="w-[18px] h-[18px] rounded-full border-2 border-slate-700 hover:border-brand-primary transition-colors" 
                           />
                         )}
                         <span className={cn("text-sm font-medium", ex.completed ? "text-slate-600 line-through" : "text-slate-200")}>
                           {ex.name}
                         </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {ex.sets && <span>{ex.sets} sets</span>}
                        {ex.reps && <span>{ex.reps} reps</span>}
                        {ex.duration && <span>{ex.duration}s</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                   <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>45 mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity size={14} />
                        <span>High Intensity</span>
                      </div>
                   </div>
                   <button className="px-5 py-2 rounded-xl bg-white text-slate-950 font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-white/5">
                      Start Workout
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {state.workouts.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-[2rem] border-2 border-dashed border-slate-800 bg-slate-900/20">
               <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-slate-700">
                  <Dumbbell size={32} />
               </div>
               <div>
                 <h3 className="text-xl font-bold font-display text-white">No Workouts Yet</h3>
                 <p className="text-slate-500 font-medium">Use AI Suggestion or create your first training plan</p>
               </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Activity icon from lucide (already imported as TrendingUp, but used in component as Activity)
const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default Workouts;
