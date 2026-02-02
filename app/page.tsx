"use client";
import TaskInput from "./components/TaskInput";
import Task from "./components/Task";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import { TaskItem, Level } from "./types";

export default function Home() {
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentEnergyLevel, setCurrentEnergyLevel] = useState<Level>("low");
  const [currentAnxietyLevel, setCurrentAnxietyLevel] = useState<Level>("low");
  const [tasksList, setTasksList] = useState<TaskItem[]>([]);

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
    localStorage.setItem("taskList", JSON.stringify(tasksList));
    setCurrentTaskTitle("");
  }

  function onToggleDone(taskId: number) {
    setTasksList(
      tasksList.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function onDeleteDone() {
    setTasksList(tasksList.filter((task) => !task.done));
  }

  function onDeleteTask(taskId: number) {
    setTasksList(tasksList.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    setTasksList(JSON.parse(localStorage.getItem("taskList") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <div className="container w-fit m-auto">
      <header>
        <h1 className="text-4xl font-bold my-4">Save Me</h1>
        <h2 className="text-2xl">A to-do app to reduce stress</h2>
      </header>
      <main className="container p-2">
        <TaskInput
          currentTaskTitle={currentTaskTitle}
          setCurrentTaskTitle={setCurrentTaskTitle}
          onAddTask={onAddTask}
          currentEnergyLevel={currentEnergyLevel}
          currentAnxietyLevel={currentAnxietyLevel}
          setCurrentEnergyLevel={setCurrentEnergyLevel}
          setCurrentAnxietyLevel={setCurrentAnxietyLevel}
        />
        <div className="flex flex-col gap-4 p-4 w-fit">
          {tasksList.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasksList.map((task) => (
              <Task
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
      <footer>
        <Button onClick={onDeleteDone}>Delete done tasks</Button>
      </footer>
    </div>
  );
}
