import axios from "axios";
import React, { useEffect, useState } from "react";
import Column from "./Column";

interface Task {
  id: string;
  title: string;
  column: string;
  order: number;
}

const columns: ("todo" | "inProgress" | "done")[] = ["todo", "inProgress", "done"];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:3002/tasks").then((res) => {
      setTasks(res.data.tasks);
    });
  }, []);

  console.log(tasks);

  // Handle task drop
  const handleDrop = (draggedId: string, targetColumn: string, targetIndex: number) => {
    const draggedTask = tasks.find((t) => t.id === draggedId);
    if (!draggedTask) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedId) {
        return { ...task, column: targetColumn, order: targetIndex };
      }

      // Reorder tasks in target column
      if (task.column === targetColumn && task.id !== draggedId) {
        if (task.order >= targetIndex) {
          return { ...task, order: task.order + 1 };
        }
      }

      // If moving within same column and task was after original, shift down
      if (task.column === draggedTask.column && task.id !== draggedId) {
        if (task.order > draggedTask.order) {
          return { ...task, order: task.order - 1 };
        }
      }

      return task;
    });

    setTasks(updatedTasks);

    // Update in backend
    axios.patch(`http://localhost:3002/tasks/${draggedId}/position`, {
      column: targetColumn,
      order: targetIndex,
    });
  };

  return (
    <div className="flex gap-5 p-5 bg-gray-100 min-h-screen">
      {columns.map((col) => (
        <Column
          key={col}
          title={col}
          tasks={tasks.filter((task) => task.column === col).sort((a, b) => a.order - b.order)}
          onDropTask={handleDrop}
        />
      ))}
    </div>
  );
};

export default Board;
