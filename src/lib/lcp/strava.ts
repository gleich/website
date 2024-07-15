import { Cache, loadFromLCP } from './lcp';

export async function loadStravaData() {
  return loadFromLCP<Activity[]>(Cache.Strava);
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
    default:
      name = 'Workout';
      icon_name = 'workout.svg';
  }
  return [name, icon_folder + icon_name];
}

export interface Activity {
  name: string;
  sport_type: string;
  start_date: Date;
  timezone: string;
  map: Map;
  trainer: boolean;
  commute: boolean;
  private: boolean;
  average_speed: number;
  max_speed: number;
  average_temp: number;
  average_cadence: number;
  average_watts: number;
  device_watts: boolean;
  average_heartrate: number;
  total_elevation_gain: number;
  moving_time: number;
  suffer_score: number;
  pr_count: number;
  distance: number;
  id: number;
}

export interface Map {
  summary_polyline: string;
}
