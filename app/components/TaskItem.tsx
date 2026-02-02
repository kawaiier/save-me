import { Task } from "../types";
import { Level, LEVELS } from "../types";
import LevelLabel from "./LevelLabel";

interface TaskProps {
  task: Task;
  onToggleDone: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  energyLevel: Level;
  anxietyLevel: Level;
}

export default function TaskItem({
  task,
  onToggleDone,
  onDeleteTask,
  energyLevel,
  anxietyLevel,
}: TaskProps) {
  const energyScore = 10 * (LEVELS.indexOf(energyLevel) + 1);
  const anxietyScore = 10 * (LEVELS.indexOf(anxietyLevel) + 1);

  return (
    <div className="flex gap-2 items-center flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div
          className={
            task.done
              ? "w-4 h-4 bg-teal-800 rounded-full"
              : "w-4 h-4 bg-cyan-100 border-solid border-2 border-teal-800 rounded-full"
          }
          onClick={() => onToggleDone(task.id)}
        ></div>
        <p title={task.id.toString()}>{task.title}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <LevelLabel currentLevel={anxietyLevel}>
          Anxiety: {anxietyLevel} / {anxietyScore}
        </LevelLabel>
        <LevelLabel currentLevel={energyLevel}>
          Energy: {energyLevel} / {energyScore}
        </LevelLabel>
        <span
          className="text-red-700 rounded-3xl w-6 h-6 flex items-center justify-center p-1 hover:cursor-pointer"
          onClick={() => onDeleteTask(task.id)}
        >
          x
        </span>
      </div>
    </div>
  );
}
