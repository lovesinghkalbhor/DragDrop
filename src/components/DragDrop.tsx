import React, { useEffect } from "react";
import { canDrop } from "../utils/rules";
import { useToast } from "../custom-hooks/useToast";
import type { Task } from "../Types/Task";
import useLocalStorage from "../custom-hooks/useLocalStorage";

const DragDrop = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("dragDropTasks", [
    { id: "task-1", name: "Task 1", column: "recieved", status: "recieved" },
    { id: "task-2", name: "Task 2", column: "recieved", status: "recieved" },
    { id: "task-3", name: "Task 3", column: "recieved", status: "recieved" },
  ]);

  useEffect(() => {
    localStorage.setItem("dragDropTasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const toast = useToast();

  const onDrop = (e: React.DragEvent<HTMLDivElement>, newColumn: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("taskId");
    const draggedItemStatus = tasks.find((task) => task.id === id)?.column;

    if (draggedItemStatus && canDrop(draggedItemStatus, newColumn)) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, column: newColumn } : task
        )
      );
    } else {
      toast.showToast(
        `Moving from ${draggedItemStatus} to ${newColumn} is not allowed!`,
        "error"
      );
    }
  };

  const renderTasks = (columnName: string) => {
    return tasks
      .filter((task: Task) => task.column === columnName)
      .map((task: Task) => (
        <div
          key={task.id}
          id={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, task.id)}
          className="p-4 bg-purple-500 text-white rounded-lg shadow-md cursor-move mb-4"
        >
          {task.name}
        </div>
      ));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-inter p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recieved Column */}
        <div
          className="column bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-700 transition-all duration-300 hover:border-purple-500"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "recieved")}
        >
          <h2 className="text-xl font-bold text-gray-200 mb-4">Recieved</h2>
          <div className="min-h-[200px]">{renderTasks("recieved")}</div>
        </div>

        {/* Reviewed Column */}
        <div
          className="column bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-700 transition-all duration-300 hover:border-blue-500"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "reviewed")}
        >
          <h2 className="text-xl font-bold text-gray-200 mb-4">Reviewed</h2>
          <div className="min-h-[200px]">{renderTasks("reviewed")}</div>
        </div>

        {/* Accepted Column */}
        <div
          className="column bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-dashed border-gray-700 transition-all duration-300 hover:border-green-500"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "accepted")}
        >
          <h2 className="text-xl font-bold text-gray-200 mb-4">Accepted</h2>
          <div className="min-h-[200px]">{renderTasks("accepted")}</div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
