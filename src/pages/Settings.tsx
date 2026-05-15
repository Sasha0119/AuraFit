import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Shield, HelpCircle, Moon, Trash2 } from 'lucide-react';
import { UserProfile } from '../types';

const Settings = () => {
  const { state, updateProfile } = useApp();

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profile: UserProfile = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender') as any,
      weight: parseFloat(formData.get('weight') as string),
      height: parseFloat(formData.get('height') as string),
      goal: formData.get('goal') as any,
      activityLevel: formData.get('activityLevel') as any,
    };
    updateProfile(profile);
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <header className="space-y-1">
        <h1 className="text-4xl font-display font-bold text-white">Preferences</h1>
        <p className="text-slate-500 font-medium">Fine tune your AI coaching experience.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <nav className="space-y-1">
           {[
             { label: 'Profile', icon: User, active: true },
             { label: 'Notifications', icon: Bell },
             { label: 'Security', icon: Shield },
             { label: 'Appearance', icon: Moon },
             { label: 'Support', icon: HelpCircle },
           ].map((item) => (
             <button 
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${item.active ? 'bg-slate-900/60 border border-slate-800 text-white shadow-lg shadow-brand-primary/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
             >
                <item.icon size={18} />
                <span>{item.label}</span>
             </button>
           ))}
        </nav>

        <div className="md:col-span-2 space-y-8">
           <form onSubmit={handleProfileUpdate} className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold font-display text-white text-gradient">Identity & Body</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      name="name"
                      defaultValue={state.profile?.name} 
                      className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 outline-none focus:border-brand-primary transition-colors font-medium text-slate-100" 
                      placeholder="Enter name"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Age</label>
                    <input 
                      name="age"
                      type="number"
                      defaultValue={state.profile?.age}
                      className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 outline-none focus:border-brand-primary transition-colors font-medium text-slate-100" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weight (kg)</label>
                    <input 
                      name="weight"
                      type="number" step="0.1"
                      defaultValue={state.profile?.weight}
                      className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 outline-none focus:border-brand-primary transition-colors font-medium text-slate-100" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Height (cm)</label>
                    <input 
                      name="height"
                      type="number"
                      defaultValue={state.profile?.height}
                      className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 outline-none focus:border-brand-primary transition-colors font-medium text-slate-100" 
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Fitness Goal</label>
                 <select 
                  name="goal"
                  defaultValue={state.profile?.goal}
                  className="w-full h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 outline-none focus:border-brand-primary transition-colors font-bold appearance-none text-slate-100"
                 >
                    <option value="loss">Weight Loss</option>
                    <option value="gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="strength">Pure Strength</option>
                 </select>
              </div>

              <div className="pt-4">
                 <button type="submit" className="w-full h-14 rounded-2xl bg-white text-slate-950 font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-white/10">
                    Save Changes
                 </button>
              </div>
           </form>

           <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold font-display text-rose-500">Danger Zone</h2>
              <p className="text-sm text-slate-500 font-medium">Deleting your account will permanently remove all workout history and AI personalization data.</p>
              <button 
                className="flex items-center gap-2 text-rose-500 font-bold px-4 py-2 border border-rose-500/20 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 transition-all font-display uppercase tracking-widest text-[10px]"
                onClick={() => {
                   if(confirm("Are you sure?")) {
                      localStorage.clear();
                      window.location.reload();
                   }
                }}
              >
                 <Trash2 size={16} />
                 <span>Reset All Data</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
