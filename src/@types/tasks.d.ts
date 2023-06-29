export interface TaskType {
  id: number;
  task_description: string;
  statut: boolean;
  position: number;
}

export interface TodoProps {
  userId: number;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  addNewNotification: (string: string, boolean: boolean) => void;
}
