import { TaskType } from './tasks'
import { Iwatering } from './plants'

export interface PagesProps {
    setIsLoginModalOpen: (value: boolean) => void;
    setIsSignup: (value: boolean) => void;
    userId: number;
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    hasPlant: Iwatering[];
    setHasPlant: (arrayOfPlants: Iwatering[]) => void;
    tasks: TaskType[];
    setTasks: (tasks: TaskType[]) => void;
    addNewNotification: (string: string, boolean: boolean) => void;
}