import React from "react";
import { useDrag } from "react-dnd";

const columnBorderColor: Record<string, string> = {
  todo: "border-l-blue-500",
  inProgress: "border-l-yellow-500",
  done: "border-l-green-500",
};

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    column: string;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-3 transition-opacity duration-200 ${
        columnBorderColor[task.column] || "border-l-gray-300"
      } border-l-4 ${isDragging ? "opacity-50" : "opacity-100"}`}>
      <p className="text-sm font-medium text-gray-800">{task.title}</p>
      <p className="text-xs text-gray-500">{task.description}</p>
    </div>
  );
};

export default Task;
