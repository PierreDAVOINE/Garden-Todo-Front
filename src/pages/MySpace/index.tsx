import Garden from './Garden';
import Todo from './Todo';
import './style.scss';
import { SpacePropsType } from '../../../src/@types/plants';



function MySpace({
  isLogged,
  hasPlant,
  setHasPlant,
  userId,
  tasks,
  setTasks,
  addNewNotification
}: SpacePropsType) {
  return (
    <div className="my-space">
      <Garden
        isLogged={isLogged}
        hasPlant={hasPlant}
        setHasPlant={setHasPlant}
        userId={userId}
        addNewNotification={(newMessage, status) => addNewNotification(newMessage, status)}
      />
      <Todo userId={userId} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
export default MySpace;
