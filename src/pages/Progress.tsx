import React from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trophy, TrendingUp, Calendar, Zap } from 'lucide-react';

const Progress = () => {
  const { state } = useApp();

  const data = [
    { name: 'Mon', weight: 80, strength: 65, cardio: 40 },
    { name: 'Tue', weight: 79.8, strength: 68, cardio: 45 },
    { name: 'Wed', weight: 79.5, strength: 70, cardio: 42 },
    { name: 'Thu', weight: 79.6, strength: 72, cardio: 50 },
    { name: 'Fri', weight: 79.2, strength: 75, cardio: 55 },
    { name: 'Sat', weight: 79.0, strength: 78, cardio: 60 },
    { name: 'Sun', weight: 78.5, strength: 82, cardio: 58 },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-1">
        <h1 className="text-4xl font-display font-bold text-white">Progress Tracking</h1>
        <p className="text-slate-500 font-medium">Visualize your journey to greatness.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Achievements Card */}
        <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-8 shadow-xl">
           <h2 className="text-xl font-bold font-display text-white">Recent Achievements</h2>
           <div className="space-y-4">
              {[
                { title: '7 Day Streak', date: 'Yesterday', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                { title: 'Perfect Macros', date: '2 days ago', icon: Trophy, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
                { title: '10k Steps', date: 'Today', icon: TrendingUp, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.date}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/30 text-white text-center shadow-lg shadow-brand-primary/10">
              <h3 className="text-2xl font-bold font-display mb-1">Level 12</h3>
              <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">350 XP to Next Level</p>
              <div className="h-1.5 w-full bg-slate-800 rounded-full mt-4">
                 <div className="h-full w-2/3 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              </div>
           </div>
        </div>

        {/* Weight Loss / Metric Card */}
        <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-8 shadow-xl">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">Performance Metrics</h2>
              <div className="flex gap-2 text-gradient">
                 <button className="px-3 py-1 rounded-lg bg-brand-primary text-slate-950 text-xs font-bold shadow-lg shadow-brand-primary/20">Weight</button>
                 <button className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">Strength</button>
              </div>
           </div>

           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                      domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#06b6d4" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: '#06b6d4', strokeWidth: 2, stroke: '#0f172a' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                 </LineChart>
              </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-slate-800/40 border border-slate-700/50 space-y-2">
                 <div className="flex items-center gap-2 text-brand-primary">
                    <Calendar size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">THIS MONTH</span>
                 </div>
                 <h3 className="text-3xl font-bold font-display text-white">-2.4 kg</h3>
                 <p className="text-sm font-medium text-slate-500">Total weight difference</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-800/40 border border-slate-700/50 space-y-2">
                 <div className="flex items-center gap-2 text-brand-secondary">
                    <TrendingUp size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">STRENGTH INDEX</span>
                 </div>
                 <h3 className="text-3xl font-bold font-display text-white">+18.5%</h3>
                 <p className="text-sm font-medium text-slate-500">Progress since last month</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Progress;
