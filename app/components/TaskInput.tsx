"use client";

import { FormEvent, ChangeEvent } from "react";
import Button from "./Button";
import { Level } from "../types";
import LevelDropdown from "./LevelDropdown";

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
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentTaskTitle(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (currentTaskTitle !== "") {
      onAddTask(currentTaskTitle, currentAnxietyLevel, currentEnergyLevel);
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
    <form onSubmit={handleSubmit} className="p-4 flex gap-4 w-fit">
      <input
        className="bg-gray-400"
        onChange={handleInputChange}
        value={currentTaskTitle}
      />
      <LevelDropdown
        level={currentAnxietyLevel}
        onChange={handleAnxietyChange}
      />
      <LevelDropdown level={currentEnergyLevel} onChange={handleEnergyChange} />
      <Button type={"submit"}>Add Task</Button>
      <Button type={"reset"} onClick={handleReset}>
        Reset
      </Button>
    </form>
  );
}
