import React from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { Activity, Droplets, Utensils, Zap, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const { state, logWater } = useApp();
  
  const macroData = [
    { name: 'Protein', value: state.today.nutrition.protein, color: '#06b6d4' },
    { name: 'Carbs', value: state.today.nutrition.carbs, color: '#f59e0b' },
    { name: 'Fats', value: state.today.nutrition.fats, color: '#10b981' },
  ].filter(d => d.value > 0);

  if (macroData.length === 0) {
    macroData.push({ name: 'Empty', value: 1, color: '#1e293b' });
  }

  const chartData = [
    { day: 'Mon', calories: 2100 },
    { day: 'Tue', calories: 1850 },
    { day: 'Wed', calories: 2300 },
    { day: 'Thu', calories: 1950 },
    { day: 'Fri', calories: 2500 },
    { day: 'Sat', calories: 2100 },
    { day: 'Sun', calories: state.today.nutrition.calories },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white">Good Morning, {state.profile?.name || 'Athlete'}</h1>
          <p className="text-slate-500 font-medium">Here's your progress for today</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-[1.25rem]">
          <Calendar size={18} className="text-slate-500" />
          <span className="text-sm font-bold text-slate-300">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</span>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Progress Card */}
        <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-white">Activity Overview</h2>
            <select className="bg-slate-800 border-none rounded-lg text-xs font-bold px-3 py-1 text-slate-400 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Workouts', val: state.workouts.length, icon: Activity, color: 'text-brand-primary' },
              { label: 'Duration', val: '4.2h', icon: Zap, color: 'text-yellow-500' },
              { label: 'Kcal Burned', val: '12.4k', icon: Activity, color: 'text-orange-500' },
              { label: 'Avg Pulse', val: '72', icon: Activity, color: 'text-rose-500' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <stat.icon size={16} className={cn("mb-2", stat.color)} />
                <p className="text-xl font-bold font-display text-white">{stat.val}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Macros Card */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 flex flex-col items-center">
            <h2 className="text-xl font-bold font-display mb-8 self-start text-white">Nutrition</h2>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold font-display text-white">{state.today.nutrition.calories}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">KCAL</span>
              </div>
            </div>
            
            <div className="w-full mt-8 space-y-3">
              {macroData.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-sm font-medium text-slate-400">{m.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-200">{m.value}g</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] gradient-brand border border-white/10 text-white relative overflow-hidden group shadow-2xl shadow-brand-primary/20">
            <div className="absolute top-0 right-0 p-8">
               <Droplets size={64} className="opacity-20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold font-display mb-2">Hydration</h2>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold">{state.today.nutrition.water}</span>
                <span className="text-lg font-medium opacity-80">/ 3000 ml</span>
              </div>
              <button 
                onClick={() => logWater(250)}
                className="w-full h-12 rounded-xl bg-white text-slate-950 font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-white/10"
              >
                Add 250ml
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
