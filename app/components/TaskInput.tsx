"use client";

import { FormEvent, ChangeEvent } from "react";
import Button from "./Button";

interface TaskInputProps {
  onAddTask: (value1: string, value2: number) => void;
  currentTaskTitle: string;
  currentEstimationTime: number;
  setCurrentTaskTitle: (value: string) => void;
  setCurrentEstimationTime: (value: number) => void;
}

export default function TaskInput({
  onAddTask,
  currentTaskTitle,
  currentEstimationTime,
  setCurrentTaskTitle,
  setCurrentEstimationTime,
}: TaskInputProps) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentTaskTitle(e.target.value);
  }

  function handleEstimationChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentEstimationTime(Number(e.target.value));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (currentTaskTitle !== "") {
      onAddTask(currentTaskTitle, currentEstimationTime);
      setCurrentTaskTitle("");
      setCurrentEstimationTime(0);
    }
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 w-fit">
      <input
        className="bg-gray-400"
        onChange={handleInputChange}
        value={currentTaskTitle}
      />
      <input
        className="bg-gray-400"
        onChange={handleEstimationChange}
        value={currentEstimationTime}
        type="number"
      />
      <Button type={"submit"}>Add Task</Button>
    </form>
  );
}
