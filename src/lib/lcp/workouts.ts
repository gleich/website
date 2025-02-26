import { Cache, loadFromLCP } from './lcp';

export async function loadWorkoutsData() {
  return loadFromLCP<Workout[]>(Cache.Workouts);
}

export function extractSportType(sport_type: string): [string, string] {
  const icon_folder = '/icons/activities/strava/';
  let name: string;
  let icon_name: string;
  switch (sport_type) {
    case 'Run':
      name = sport_type;
      icon_name = 'run.svg';
      break;
    case 'GravelRide':
      name = 'Gravel Ride';
      icon_name = 'gravel.svg';
      break;
    case 'Hike':
      name = sport_type;
      icon_name = 'hike.svg';
      break;
    case 'Walk':
      name = sport_type;
      icon_name = 'walk.svg';
      break;
    case 'Ride':
      name = sport_type;
      icon_name = 'ride.svg';
      break;
    case 'MountainBikeRide':
      name = 'Mountain Bike Ride';
      icon_name = 'mtb.svg';
      break;
    case 'Kayaking':
      name = sport_type;
      icon_name = 'kayak.svg';
      break;
    case 'Pickleball':
      name = sport_type;
      icon_name = 'pickle.svg';
      break;
    case 'WeightTraining':
      name = 'Weight Training';
      icon_name = 'weight-training.svg';
      break;
    default:
      name = 'Workout';
      icon_name = 'workout.svg';
  }
  return [name, icon_folder + icon_name];
}

export interface Workout {
  platform: string;
  name: string;
  sport_type: string;
  start_date: Date;
  timezone: string;
  map_blur_image?: string | null;
  has_map: boolean;
  map_image_url?: string | null;
  total_elevation_gain: number;
  moving_time: number;
  distance: number;
  average_heartrate?: number | null;
  id: number;
  heartrate_data: number[];
  calories?: number | null;
  hevy_exercises?: HevyExercise[] | null;
  hevy_volume_kg?: number | null;
}

export interface HevyExercise {
  title: string;
  sets: HevySet[];
}

export interface HevySet {
  index: number;
  weight_kg: number;
  reps: number;
}
