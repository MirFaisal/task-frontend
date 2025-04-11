import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

interface TaskType {
  id: string;
  title: string;
  description: string;
  column: string;
}

interface ColumnProps {
  title: "todo" | "inProgress" | "done";
  tasks: TaskType[];
  onDropTask: (taskId: string, column: string, dropIndex: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDropTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => {
      const dropIndex = tasks.length;
      onDropTask(item.id, title, dropIndex);
    },
  });

  const columnTitle: Record<string, string> = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  };

  const columnStyle: Record<string, string> = {
    todo: "bg-gradient-to-b from-blue-50 to-white",
    inProgress: "bg-gradient-to-b from-yellow-50 to-white",
    done: "bg-gradient-to-b from-green-50 to-white",
  };

  return (
    <div
      ref={drop}
      className={`flex flex-col w-full md:w-1/3 p-4 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 ${columnStyle[title]} border border-gray-200`}>
      <h2 className="text-lg font-semibold text-gray-800 px-2 py-1 mb-4 border-b border-gray-300">
        {columnTitle[title] || title}
      </h2>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <Task key={task.id} task={task} column={title} />
        ))}
      </div>
    </div>
  );
};

export default Column;
