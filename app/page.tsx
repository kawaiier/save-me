"use client";
import TaskInput from "./components/TaskInput";
import Task from "./components/Task";
import { useState } from "react";
import Button from "./components/Button";
import { TaskItem } from "./types";

export default function Home() {
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentEstimationTime, setCurrentEstimationTime] = useState<number>(0);
  const [tasksList, setTasksList] = useState<TaskItem[]>([]);

  function onAddTask(taskTitle: string, estimationTime: number) {
    setTasksList([
      ...tasksList,
      { title: taskTitle, id: Date.now(), done: false, estimationTime: estimationTime },
    ]);
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


  return (
    <div className="container w-fit m-auto">
      <header>
        <h1 className="text-4xl bold my-4">
          The best Todo Manager 
        </h1>
        <h2 className="text-2xl">but it&apos;s written in TypeScript</h2>
      </header>
      <main className="container p-2">
        <TaskInput
          currentTaskTitle={currentTaskTitle}
          setCurrentTaskTitle={setCurrentTaskTitle}
          onAddTask={onAddTask}
          currentEstimationTime={currentEstimationTime}
          setCurrentEstimationTime={setCurrentEstimationTime}
        />
        <div className="flex flex-col gap-4 p-4 w-fit">
          {tasksList.length === 0 ?<p>No tasks yet</p> :
            tasksList.map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggleDone={onToggleDone}
                onDeleteTask={onDeleteTask}
              />
            ))}
        </div>
      </main>
      <footer>
        <Button onClick={() => onDeleteDone()}>Delete done tasks</Button>
      </footer>
    </div>
  );
}
