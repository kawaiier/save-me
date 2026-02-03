"use client";

import { FormEvent, ChangeEvent } from "react";
import { Level } from "../types";
import LevelDropdown from "./LevelDropdown";
import TaskTitleInput from "./TaskTitleInput";
import { FormControl, SelectChangeEvent } from "@mui/material";
import StyledButton from "./Button";

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

  function handleEnergyChange(e: SelectChangeEvent) {
    setCurrentEnergyLevel(e.target.value as Level);
  }

  function handleAnxietyChange(e: SelectChangeEvent) {
    setCurrentAnxietyLevel(e.target.value as Level);
  }

  return (
    <FormControl>
      <TaskTitleInput
        currentTaskTitle={currentTaskTitle}
        onChange={setCurrentTaskTitle}
      />
      <div className="flex gap-4 items-center">
        <LevelDropdown
          level={currentAnxietyLevel}
          onChange={handleAnxietyChange}
          label="Anxiety Level"
        />
        <LevelDropdown
          level={currentEnergyLevel}
          onChange={handleEnergyChange}
          label="Energey Level"
        />
      </div>
      <div className="flex gap-4 items-center">
        <StyledButton type={"submit"} onClick={handleSubmit}>
          Add Task
        </StyledButton>
        <StyledButton type={"reset"} onClick={handleReset}>
          Reset
        </StyledButton>
      </div>
    </FormControl>
  );
}
