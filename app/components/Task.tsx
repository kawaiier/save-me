import { useEffect, useState } from "react";
import { TaskItem } from "../types";

interface TaskProps {
  task: TaskItem;
  onToggleDone: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function Task({ task, onToggleDone, onDeleteTask }: TaskProps) {
  const [estimationTime, setEstimationTime] = useState<number>(0);

  useEffect(() => {
    const hourEstimation = Math.ceil(task.estimationTime/60) 
    setEstimationTime(hourEstimation);
  }, [task.estimationTime]);

  return (
    <div className="flex gap-2 items-center">
      <div
        className={task.done ? "w-4 h-4 bg-teal-800 rounded-full" : "w-4 h-4 bg-cyan-100 border-solid border-2 border-teal-800 rounded-full"}
        onClick={() => onToggleDone(task.id)}
      ></div>
      <p title={task.id.toString()}>{task.title}</p>
      <p>~{estimationTime} hours</p>
      <span
        className="text-red-700 bg-sky-50 rounded-3xl p-1"
        onClick={() => onDeleteTask(task.id)}
      >
        x
      </span>
    </div>
  );
}
