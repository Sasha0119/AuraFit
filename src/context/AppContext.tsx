import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, UserProfile, Workout, DailyStats } from '../types';

interface AppContextType {
  state: AppState;
  updateProfile: (profile: UserProfile) => void;
  addWorkout: (workout: Workout) => void;
  logWater: (amount: number) => void;
  logNutrition: (calories: number, p: number, c: number, f: number) => void;
  completeExercise: (workoutId: string, exerciseId: string) => void;
}

const DEFAULT_STATE: AppState = {
  profile: null,
  workouts: [],
  history: [],
  today: {
    date: new Date().toISOString().split('T')[0],
    steps: 0,
    caloriesBurned: 0,
    workoutDuration: 0,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      water: 0
    }
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('aurafit_state');
    if (saved) return JSON.parse(saved);
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('aurafit_state', JSON.stringify(state));
  }, [state]);

  const updateProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile }));
  };

  const addWorkout = (workout: Workout) => {
    setState(prev => ({ ...prev, workouts: [workout, ...prev.workouts] }));
  };

  const logWater = (amount: number) => {
    setState(prev => ({
      ...prev,
      today: {
        ...prev.today,
        nutrition: {
          ...prev.today.nutrition,
          water: prev.today.nutrition.water + amount
        }
      }
    }));
  };

  const logNutrition = (calories: number, p: number, c: number, f: number) => {
    setState(prev => ({
      ...prev,
      today: {
        ...prev.today,
        nutrition: {
          ...prev.today.nutrition,
          calories: prev.today.nutrition.calories + calories,
          protein: prev.today.nutrition.protein + p,
          carbs: prev.today.nutrition.carbs + c,
          fats: prev.today.nutrition.fats + f
        }
      }
    }));
  };

  const completeExercise = (workoutId: string, exerciseId: string) => {
    setState(prev => ({
      ...prev,
      workouts: prev.workouts.map(w => {
        if (w.id === workoutId) {
          return {
            ...w,
            exercises: w.exercises.map(e => e.id === exerciseId ? { ...e, completed: true } : e)
          };
        }
        return w;
      })
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateProfile, addWorkout, logWater, logNutrition, completeExercise }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
