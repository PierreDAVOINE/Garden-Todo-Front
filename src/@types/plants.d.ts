import { TaskType } from './tasks';

export interface PlantAllProps {
  id: number;
  plant_name: string;
  slug_name: string;
  latin_plant_name: string;
  plant_type: string;
  is_plant_ext: boolean;
  origin: string;
  is_perennial: boolean;
  is_rustic: boolean;
  sunshine: string;
  toxicity: string;
  is_edible: boolean;
  seed_month_planting: string;
  harvest_time: number;
  fertilizer_frequency: number;
  repotting_interval: number;
  watering_interval: number;
  watering_frequency: string;
  color: string;
  soil_type: string;
  humidity: number;
  plant_description: string;
  min_temp: number;
  max_temp: number;
  max_height: number;
  url_image: string;
}

export interface Iwatering extends PlantAllProps {
  id: number;
  last_watering: string;
  plant_id: number;
  user_id: number;
}

export interface Iwatering {
  id: number;
  plant_name: string;
  plant_id: number;
  latin_plant_name: string;
  url_image: string;
  slug_name: string;
  last_watering: number;
  watering_interval: number;
}

export interface handlePlantCardGardenProps {
  plant: Iwatering;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  isLogged: boolean;
  setIsPlantModalOpen: (boolean: boolean) => void;
  setWhichPlantClicked: (plant: Iwatering) => void;
  userId: number;
  addNewNotification: (string: string, boolean: boolean) => void;
}

export interface PlantResponseApi {
  id: number;
  plant_name: string;
  latin_plant_name: string;
  url_image: string;
  slug_name: string;
}

export interface HandlePlantProps {
  plant: PlantResponseApi;
  isLogged: boolean;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  userId: number;
  addNewNotification: (string: string, boolean: boolean) => void;
}

export interface HandlePlantModalProps {
  setIsPlantModalOpen: (boolean: boolean) => void;
  whichPlantClicked: Iwatering;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  userId: number;
  addNewNotification: (string: string, boolean: boolean) => void;
}

export interface GardenPropsType {
  isLogged: boolean;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  userId: number;
  addNewNotification: (string: string, boolean: boolean) => void;
}
whichPlantProps;

export interface SpacePropsType {
  setIsLogged: (value: boolean) => void;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  userId: number;
  isLogged: boolean;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  addNewNotification: (string: string, boolean: boolean) => void;
  setIsLoginModalOpen: (boolean: boolean) => void;
  setIsSignup: (boolean: boolean) => void;
}

export interface OnePlantProps {
  isLogged: boolean;
  userId: number;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  addNewNotification: (string: string, boolean: boolean) => void;
}

interface HandlePlanFormProps {
  inputSearchbar: string;
  fetchOnePlant: () => void;
  setinputSearchbar: (value: string) => void;
  // Fonctionnalités pour plus tard - recherche avancée
  //setsearchIsOpen: (value: boolean) => void;
  //searchIsOpen: boolean;
}

export interface PlantResponseApi {
  id: number;
  plant_name: string;
  latin_plant_name: string;
  url_image: string;
  slug_name: string;
}

export interface PlantsListProps {
  isLogged: boolean;
  hasPlant: Iwatering[];
  setHasPlant: (arrayOfPlants: Iwatering[]) => void;
  userId: number;
  addNewNotification: (string: string, boolean: boolean) => void;
}
