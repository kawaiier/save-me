"use client";
import TaskCreator from "./components/TaskCreator";
import TaskItem from "./components/TaskItem";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import { Task, Level, LEVELS } from "./types";

export default function Home() {
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentEnergyLevel, setCurrentEnergyLevel] = useState<Level>("low");
  const [currentAnxietyLevel, setCurrentAnxietyLevel] = useState<Level>("low");
  const [tasksList, setTasksList] = useState<Task[]>([]);

  function onAddTask(
    taskTitle: string,
    energyLevel: Level,
    anxietyLevel: Level,
  ) {
    setTasksList((prev) => [
      ...prev,
      {
        title: taskTitle,
        id: Date.now(),
        done: false,
        energyLevel,
        anxietyLevel,
      },
    ]);
    setCurrentTaskTitle("");
  }

  function onToggleDone(taskId: number) {
    setTasksList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function onDeleteDone() {
    setTasksList((prev) => prev.filter((task) => !task.done));
  }

  function onDeleteAll() {
    setTasksList([]);
  }

  function onDeleteTask(taskId: number) {
    setTasksList((prev) => prev.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    setTasksList(JSON.parse(localStorage.getItem("taskList") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasksList));
  }, [tasksList]);

  const currentEnergyScore = tasksList
    .map((task) => 10 * (LEVELS.indexOf(task.energyLevel) + 1))
    .reduce((acc, curr) => acc + curr, 0);
  const currentAnxietyScore = tasksList
    .map((task) => 10 * (LEVELS.indexOf(task.anxietyLevel) + 1))
    .reduce((acc, curr) => acc + curr, 0);

  const totalStressScore = currentEnergyScore + currentAnxietyScore;

  const scoreColor =
    totalStressScore <= 50
      ? "text-green-300"
      : totalStressScore <= 100
        ? "text-yellow-300"
        : "text-red-300";

  const stressMessage =
    totalStressScore <= 50
      ? "Great job! Keep up the good work."
      : totalStressScore <= 100
        ? "You're doing well, but there's room for improvement."
        : "Think of decreasing your workload for today.";

  return (
    <div className="container p-4 flex flex-col items-center m-auto">
      <header className="border-b mb-6 pb-4 border-teal-200/60">
        <h1 className="text-4xl font-bold my-4">Save Me</h1>
        <h2 className="text-2xl">A to-do app to reduce stress</h2>
      </header>
      <main className="container flex flex-col items-center p-2">
        <h3>
          Current Stress Score:{" "}
          <span className={`${scoreColor}`}>{totalStressScore}</span>
        </h3>
        <p>{stressMessage}</p>
        <TaskCreator
          currentTaskTitle={currentTaskTitle}
          setCurrentTaskTitle={setCurrentTaskTitle}
          onAddTask={onAddTask}
          currentEnergyLevel={currentEnergyLevel}
          currentAnxietyLevel={currentAnxietyLevel}
          setCurrentEnergyLevel={setCurrentEnergyLevel}
          setCurrentAnxietyLevel={setCurrentAnxietyLevel}
        />
        <h3 className="text-xl">Inbox</h3>
        <div className="flex flex-col gap-4 p-4 w-fit">
          {tasksList.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasksList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleDone={onToggleDone}
                onDeleteTask={onDeleteTask}
                energyLevel={task.energyLevel}
                anxietyLevel={task.anxietyLevel}
              />
            ))
          )}
        </div>
      </main>
      <footer className="mt-6 w-full max-w-xl border-t border-teal-200/60 pt-4 flex justify-center gap-4 dark:text-black">
        <Button onClick={onDeleteDone}>Delete done</Button>
        <Button onClick={onDeleteAll}>Delete all</Button>
      </footer>
    </div>
  );
}
