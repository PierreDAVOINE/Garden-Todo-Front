import React, { useState, useEffect, FormEvent } from 'react';
import { ReactSortable } from 'react-sortablejs';
// import axios from "axios";
import './style.scss';
import {
  PlusCircle,
  Edit,
  Trash2,
  CheckSquare,
} from '../../../../node_modules/react-feather/dist/index';
import { axiosInstance } from '../../../utils/axios';
import { TodoProps } from '../../../../src/@types/tasks';

function Todo({ userId, tasks, setTasks }: TodoProps) {
  // newTaskText permet de connaître a tout moment la valeur de l'input
  const [newTaskText, setNewTaskText] = useState('');
  // editingTaskId permet de stocker l'id de la tâche en cours d'édition et ainsi de savoir que nous sommes en "mode edition" lorsque l'id est différent de 0
  const [editingTaskId, setEditingTaskId] = useState(0);
  // editingTaskText contient la nouvelle description de la tâche en cours d'edition
  const [editingTaskText, setEditingTaskText] = useState('');
  // isUpdating est un state qui sert simplement "d'intérupteur" pour déclancher un useEffect qui lui même va déclanche la mise a jour des position des tâches via handleChangePos()
  const [isUpdating, setIsUpdating] = useState(false);

  //! Ajout d'une tâche au submit du formulaire
  const addTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskText) {
      const response = await axiosInstance.post(`/tasks/${userId}`, {
        newTask: newTaskText,
        position: tasks.length + 1,
      });
      if (response.status !== 200) {
        console.log('Un problème est survenu');
      } else {
        const newTask = response.data;

        console.log(newTask);
        setTasks([...tasks, newTask]); // création de newTask à la suite de Tasks
        setNewTaskText('');
      }
    }
  };

  //! Suppression d'une tâche
  const deleteTask = async (taskId: number) => {
    const response = await axiosInstance.delete(`/tasks/${userId}/${taskId}`);
    if (response.status !== 200) {
      console.log('Un problème est survenu');
    } else {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  //! Update d'une tâche
  //* Update d'un status de tâche
  const handleCheckTask = async (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const oldTasks = [...tasks];
    const updatedTasks = oldTasks.map((task) =>
      // vérifier si id bien égal à celle de la tache, si c'est le cas, on modifie la tache
      // recupérer les propriété de la tache modifiée puis mettre à jour avec valeur
      // ce qui entraine creation de task
      task.id === taskId ? { ...task, statut: e.target.checked } : task
    );
    console.log('Tâches mise a jour : ', updatedTasks);
    const theUptdatedTask = updatedTasks.find((task) => task.id === taskId);
    console.log('La tâche mise a jour : ', theUptdatedTask);
    // On envoie la tâche mise à jour à l'API
    if (!theUptdatedTask) return;
    const response = await axiosInstance.patch(`/tasks/${userId}/${taskId}`, {
      updateTask: theUptdatedTask.task_description,
      updateStatut: theUptdatedTask.statut,
      updatePosition: theUptdatedTask.position,
    });
    if (response.status !== 200) {
      console.log('Un problème est survenu');
    } else {
      setTasks(updatedTasks);
    }
  };

  const [isDraggableDisabled, setIsDraggableDisabled] = useState(false);

  //* Update d'une description de tâche
  const startEditingTask = (taskId: number, task_description: string) => {
    setIsDraggableDisabled(true);
    setEditingTaskId(taskId); // taskId = modification d'une tache par ID
    setEditingTaskText(task_description); //Text = texte à modifier
  };

  const updateTask = async (e: FormEvent<HTMLFormElement>, taskId: number) => {
    e.preventDefault();
    // prise en compte de l'id de la tache
    // utilisation de map pour parcourir les différentes taches
    const oldTasks = [...tasks];
    const updatedTasks = oldTasks.map((task) =>
      // vérifier si id bien égal à celle de la tache, si c'est le cas, on modifie la tache
      // recupérer les propriété de la tache modifiée puis mettre à jour avec valeur
      // ce qui entraine creation de task
      task.id === taskId ? { ...task, task_description: editingTaskText } : task
    );
    console.log('Tâches mise a jour : ', updatedTasks);
    const theUptdatedTask = updatedTasks.find((task) => task.id === taskId);
    console.log('La tâche mise a jour : ', theUptdatedTask);
    // On envoie la tâche mise à jour à l'API
    if (!theUptdatedTask) return;
    const response = await axiosInstance.patch(`/tasks/${userId}/${taskId}`, {
      updateTask: theUptdatedTask.task_description,
      updateStatut: theUptdatedTask.statut,
      updatePosition: theUptdatedTask.position,
    });
    if (response.status !== 200) {
      console.log('Un problème est survenu');
    } else {
      setTasks(updatedTasks);
      setEditingTaskId(0);
      setEditingTaskText('');
    }
  };

  //* Update de la position d'une tâche
  // L'événement onEnd() sur <ReactSortable> met a jour le state isUpdating à son inverse
  // La mise a jour de isUpdating enclanche le useEffect qui a son tour execute handleChangePos()
  // On passe ici par un useEffect() intermediaire car si onEnd execute directement handleChangePos, le state tasks n'est pas encore mis a jour par sortableJS
  useEffect(() => {
    handleChangePos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  const handleChangePos = async () => {
    // On vérifie si les tâches son récupérée, si oui, on met a jour les positions via les index de tasks
    if (tasks.length > 0) {
      const newTasks = [...tasks];
      for (let i = 0; i < newTasks.length; i++) {
        newTasks[i].position = i + 1;
      }
      const response = await axiosInstance.patch(`/tasks/${userId}`, {
        newTasks,
      });
      if (response.status !== 200) {
        console.log('Un problème est survenu');
      } else {
        setTasks(newTasks);
      }
    }
  };

  return (
    <div className="todolist__container">
      <div className="tasks__list__container">
        <h2 className="todolist__heading">Ma Todolist</h2>
        {/* //!  SORTABLE ----------------------------------------------------- */}
        {/* utilisation de reactSortable, dans la création d'élément tache  */}
        <ul>
          {tasks && (
            <ReactSortable
              list={tasks}
              setList={setTasks}
              onEnd={() => setIsUpdating(!isUpdating)}
              options={{ disabled: isDraggableDisabled }}
            >
              {tasks.map((task) => (
                // créer un li avec une key id spécifique
                <li key={task.id} className="task__item">
                  <label className="container">
                    <input
                      type="checkbox"
                      defaultChecked={task.statut}
                      onChange={(e) => handleCheckTask(e, task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  {editingTaskId === task.id ? (
                    <>
                      <form onSubmit={(e) => updateTask(e, task.id)}>
                        <label htmlFor="item"></label>
                        <input
                          id="item"
                          type="text" // définir en champs texte
                          maxLength={23} // obligé de mettre une max lenght pour éviter l'overflow ( et harmoniser la page )
                          value={editingTaskText} // valeur définie
                          onChange={(e) => setEditingTaskText(e.target.value)} // quand modifications, setEditingTaskText appellé, pour modifier EditingTaskText
                          className="task__text"
                        />
                        <button type="submit" className="action__button">
                          <CheckSquare />
                        </button>
                      </form>
                    </>
                  ) : (
                    <span
                      className={
                        task.statut ? 'task__text checked' : 'task__text'
                      }
                    >
                      {task.task_description}
                    </span> //pour récupérer la description texte de la tâche
                  )}
                  {!editingTaskId && (
                    <>
                      <button
                        onClick={() =>
                          startEditingTask(task.id, task.task_description)
                        }
                        className="action__button"
                      >
                        <Edit />
                      </button>

                      {/* Supprimer la tâche via ID quand on clique sur le bouton delete */}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="action__button_delete"
                      >
                        <Trash2 />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ReactSortable>
          )}
        </ul>
      </div>
      {/* //! ------------------------------------------------------------------------------------------------ */}

      <div className="add__task">
        <form onSubmit={(e) => addTask(e)}>
          <label htmlFor="send"></label>
          <input // input pour la  création d'une nouvelle tache
            id="send"
            type="text"
            maxLength={23}
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)} // pour que la description Text soit prise en compte
            className="task__input"
            placeholder="Nouvelle tâche..." // avec un placeholder
          />
          <button type="submit" className="add__button">
            <PlusCircle />
            {/* bouton pour créer une nouvelle tâche */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Todo;
