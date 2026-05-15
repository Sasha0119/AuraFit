export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  goal: 'loss' | 'gain' | 'maintenance' | 'strength';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'extra';
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: string;
  duration?: number; // in seconds
  intensity?: 'low' | 'medium' | 'high';
  completed?: boolean;
}

export interface Workout {
  id: string;
  title: string;
  date: string;
  exercises: Exercise[];
  type: string;
  isCustom?: boolean;
}

export interface NutritionLog {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number; // in ml
}

export interface DailyStats {
  date: string;
  steps: number;
  caloriesBurned: number;
  workoutDuration: number;
  nutrition: NutritionLog;
}

export interface AppState {
  profile: UserProfile | null;
  workouts: Workout[];
  history: DailyStats[];
  today: DailyStats;
}
