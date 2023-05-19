import React, { useState } from "react";
import InputTask from "./InputTask";

const TaskBoard = () => {
  const [lists, setLists] = useState([
    { id: 1, title: "Task 1", tasks: [] },
    { id: 2, title: "Task 2", tasks: [] },
    { id: 3, title: "Task 3", tasks: [] },
  ]);
  const [newListTitle, setNewListTitle] = useState("");

  const handleDragStart = (e, listId, taskId) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ listId, taskId }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, listId) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { listId: sourceListId, taskId } = JSON.parse(data);

    if (listId === sourceListId) {
      return;
    }

    const updatedLists = lists.map((list) => {
      if (list.id === sourceListId) {
        // Remove the task from the source list
        const tasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks };
      }
      if (list.id === listId) {
        // Add the task to the destination list
        const task = lists
          .find((list) => list.id === sourceListId)
          .tasks.find((task) => task.id === taskId);
        return { ...list, tasks: [...list.tasks, task] };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleCreateList = () => {
    if (newListTitle.trim() === "") {
      return;
    }

    const newList = {
      id: Date.now(),
      title: newListTitle,
      tasks: [],
    };

    setLists([...lists, newList]);
    setNewListTitle("");
  };

  return (
    <div className="task-board">
      {lists.map((list) => (
        <div
          key={list.id}
          className="task-list"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, list.id)}
        >
          <h2>{list.title}</h2>
          {list.tasks.map((task) => (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={(e) => handleDragStart(e, list.id, task.id)}
            >
              {task.name}
            </div>
          ))}
          <InputTask list={list} lists={lists} setLists={setLists} />
        </div>
      ))}
      <div className="new-list">
        <h3>Create New List</h3>
        <input
          type="text"
          placeholder="Enter list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>
    </div>
  );
};

export default TaskBoard;
