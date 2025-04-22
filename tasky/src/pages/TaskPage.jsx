import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import AddTaskForm from '../components/Form';
import { getTasks, addTask, deleteTask, updateTask } from '../api/tasky-api';

const TaskPage = () => {
  const [taskState, setTaskState] = useState({ tasks: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    getTasks(token).then(tasks => {
      setTaskState({ tasks: tasks });
    });
  }, []);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    const token = localStorage.getItem('token');
    updateTask(tasks[taskIndex], token);
    setTaskState({ tasks });
  };

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    const token = localStorage.getItem('token');
    deleteTask(id, token);
    setTaskState({ tasks });
  };

  const formChangeHandler = (event) => {
    let form = { ...formState };
    switch (event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      case "priority":
        form.priority = event.target.value;
        break;
      default:
        form = formState;
    }
    setFormState(form);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const form = { ...formState };
    const token = localStorage.getItem('token');
    const newTask = await addTask(form, token);
    tasks.push(newTask);
    setTaskState({ tasks });
  };

  return (
    <>
      {taskState.tasks.map((task, index) => (
        <Task
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          key={task._id}
          done={task.done}
          priority={task.priority}
          markDone={() => doneHandler(index)}
          deleteTask={() => deleteHandler(index)}
        />
      ))}
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
    </>
  );
};

export default TaskPage;
