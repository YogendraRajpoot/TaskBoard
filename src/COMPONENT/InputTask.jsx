import React, { useState } from "react";

const InputTask = ({ list, lists, setLists }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const handleAddTask = (listId) => {
    if (newTaskName.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: newTaskName,
    };

    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, tasks: [...list.tasks, newTask] };
      }
      return list;
    });

    setLists(updatedLists);
    setNewTaskName("");
  };

  return (
    <div className="new-task">
      <input
        type="text"
        placeholder="Enter task name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={() => handleAddTask(list.id)}>Add Task</button>
    </div>
  );
};

export default InputTask;
