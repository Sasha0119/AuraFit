import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { geminiService } from '../services/geminiService';
import { motion } from 'motion/react';
import { Utensils, Droplets, Sparkles, Plus, PieChart, Scale, Info } from 'lucide-react';
import { calculateBMI, cn } from '../lib/utils';

const Nutrition = () => {
  const { state, logNutrition, logWater } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const handleGetMealAdvice = async () => {
    if (!state.profile) {
      alert("Please setup your profile first!");
      return;
    }
    
    setIsGenerating(true);
    const data = await geminiService.getNutritionAdvice(
      2000, // Hardcoded for now or based on profile
      state.profile.goal
    );
    
    if (data && data.meals) {
      setMealPlan(data.meals);
    }
    setIsGenerating(false);
  };

  const bmi = calculateBMI(state.profile?.weight || 0, state.profile?.height || 0);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-bold text-white">Nutrition & Fuels</h1>
          <p className="text-slate-500 font-medium">Eat for performance, not just for taste.</p>
        </div>
        
        <button 
          onClick={handleGetMealAdvice}
          disabled={isGenerating}
          className="h-12 px-6 rounded-2xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30 font-bold flex items-center gap-2 hover:bg-brand-primary/30 transition-all shadow-lg shadow-brand-primary/10"
        >
          {isGenerating ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
               <Sparkles size={20} />
            </motion.div>
          ) : <Sparkles size={20} />}
          <span>{isGenerating ? 'Analyzing Diet...' : 'AI Meal Advice'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Log & Tracking */}
        <div className="lg:col-span-4 space-y-8">
          {/* BMI Card */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">Body Index</h2>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Scale size={20} />
              </div>
            </div>

            <div className="flex items-center justify-center py-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" 
                  />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="8" 
                    strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - (bmi.value / 40))}
                    strokeLinecap="round" transform="rotate(-90 50 50)"
                    className="shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-display text-white">{bmi.value}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{bmi.category}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
              <Info size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {bmi.category === 'Normal' 
                  ? 'Great! Your BMI is in the healthy range. Keep up the activity.' 
                  : 'Consider consulting with our AI Coach for a tailored weight plan.'}
              </p>
            </div>
          </div>

          {/* Quick Log */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold font-display mb-6 text-white text-gradient">Quick Log</h2>
            <div className="space-y-4">
              <button 
                onClick={() => logNutrition(500, 20, 60, 15)}
                className="w-full p-4 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                    <Utensils size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-200">Balanced Meal</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">~500 Kcal</p>
                  </div>
                </div>
                <Plus size={20} className="text-slate-500 group-hover:text-white transition-colors" />
              </button>
              
              <button 
                onClick={() => logWater(500)}
                className="w-full p-4 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <Droplets size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-200">Water Intake</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">+500 ml</p>
                  </div>
                </div>
                <Plus size={20} className="text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Suggestions & Breakdown */}
        <div className="lg:col-span-8 space-y-8">
           <section className="space-y-6">
             <h2 className="text-xl font-bold font-display text-white">AI Recommended Meals</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mealPlan.map((meal, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
                  >
                    <div className="aspect-video rounded-2xl bg-slate-800 overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${index}/400/225`} 
                        alt={meal.mealName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display line-clamp-1 text-white">{meal.mealName}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mt-1">{meal.description || 'Nutrient dense recipe optimized for your goals.'}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                       <div className="flex gap-4 text-[10px] font-bold">
                          <div className="flex flex-col">
                             <span className="text-slate-500 uppercase tracking-widest">PRO</span>
                             <span className="text-brand-primary">{meal.protein || 25}g</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-slate-500 uppercase tracking-widest">CARB</span>
                             <span className="text-orange-400">{meal.carbs || 45}g</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-slate-500 uppercase tracking-widest">FAT</span>
                             <span className="text-brand-accent">{meal.fats || 12}g</span>
                          </div>
                       </div>
                       <button className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors text-slate-400">
                          <Plus size={18} />
                       </button>
                    </div>
                  </motion.div>
                ))}
                
                {mealPlan.length === 0 && (
                   <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-[2rem] bg-slate-900/20 border-2 border-dashed border-slate-800">
                      <Sparkles size={48} className="text-slate-800" />
                      <div>
                        <p className="text-slate-500 font-medium">Click on AI Meal Advice to generate plan</p>
                      </div>
                   </div>
                )}
             </div>
           </section>

           <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 shadow-xl">
             <h2 className="text-xl font-bold font-display mb-8 text-white">Daily Intake Overview</h2>
             <div className="space-y-6">
                {[
                  { label: 'Calories', current: state.today.nutrition.calories, max: 2500, color: 'bg-brand-primary shadow-[0_0_8px_rgba(6,182,212,0.5)]' },
                  { label: 'Proteins', current: state.today.nutrition.protein, max: 180, color: 'bg-brand-primary/60' },
                  { label: 'Carbohydrates', current: state.today.nutrition.carbs, max: 300, color: 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]' },
                  { label: 'Fats', current: state.today.nutrition.fats, max: 80, color: 'bg-brand-accent shadow-[0_0_8px_rgba(52,211,153,0.5)]' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                       <span className="text-slate-500">{item.label}</span>
                       <span className="text-white">{item.current} / {item.max}{item.label === 'Calories' ? ' kcal' : ' g'}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (item.current / item.max) * 100)}%` }}
                        className={cn("h-full rounded-full transition-all duration-500", item.color)} 
                       />
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Nutrition;
