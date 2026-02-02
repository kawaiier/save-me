import { TaskItem } from "../types";
import { Level } from "../types";
import LevelLabel from "./LevelLabel";

interface TaskProps {
  task: TaskItem;
  onToggleDone: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  energyLevel: Level;
  anxietyLevel: Level;
}

export default function Task({
  task,
  onToggleDone,
  onDeleteTask,
  energyLevel,
  anxietyLevel,
}: TaskProps) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={
          task.done
            ? "w-4 h-4 bg-teal-800 rounded-full"
            : "w-4 h-4 bg-cyan-100 border-solid border-2 border-teal-800 rounded-full"
        }
        onClick={() => onToggleDone(task.id)}
      ></div>
      <p title={task.id.toString()}>{task.title}</p>
      <LevelLabel currentLevel={anxietyLevel}>
        Anxiety: {anxietyLevel}
      </LevelLabel>
      <LevelLabel currentLevel={energyLevel}>Energy: {energyLevel}</LevelLabel>
      <span
        className="text-red-700 bg-sky-50 rounded-3xl p-1"
        onClick={() => onDeleteTask(task.id)}
      >
        x
      </span>
    </div>
  );
}
