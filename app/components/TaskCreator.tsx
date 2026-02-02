"use client";

import { FormEvent, ChangeEvent } from "react";
import Button from "./Button";
import { Level } from "../types";
import LevelDropdown from "./LevelDropdown";
import TaskTitleInput from "./TaskTitleInput";

interface TaskInputProps {
  onAddTask: (value1: string, value2: Level, value3: Level) => void;
  currentTaskTitle: string;
  setCurrentTaskTitle: (value: string) => void;
  currentEnergyLevel: Level;
  currentAnxietyLevel: Level;
  setCurrentEnergyLevel: (value: Level) => void;
  setCurrentAnxietyLevel: (value: Level) => void;
}

export default function TaskInput({
  onAddTask,
  currentTaskTitle,
  currentEnergyLevel,
  currentAnxietyLevel,
  setCurrentTaskTitle,
  setCurrentEnergyLevel,
  setCurrentAnxietyLevel,
}: TaskInputProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (currentTaskTitle !== "") {
      onAddTask(currentTaskTitle, currentEnergyLevel, currentAnxietyLevel);
      setCurrentTaskTitle("");
    }
    e.preventDefault();
  }

  function handleReset() {
    console.log("Resetting form");
    setCurrentTaskTitle("");
    setCurrentEnergyLevel("low");
    setCurrentAnxietyLevel("low");
  }

  function handleEnergyChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentEnergyLevel(e.target.value as Level);
  }

  function handleAnxietyChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentAnxietyLevel(e.target.value as Level);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <TaskTitleInput
        currentTaskTitle={currentTaskTitle}
        onChange={setCurrentTaskTitle}
      />
      <div className="flex gap-4 items-center">
        <label>Anxiety Level</label>
        <LevelDropdown
          level={currentAnxietyLevel}
          onChange={handleAnxietyChange}
        />
        <label>Energy Level</label>
        <LevelDropdown
          level={currentEnergyLevel}
          onChange={handleEnergyChange}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Button type={"submit"}>Add Task</Button>
        <Button type={"reset"} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
