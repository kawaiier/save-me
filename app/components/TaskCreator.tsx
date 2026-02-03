"use client";

import { FormEvent } from "react";
import { Level } from "../types";
import LevelDropdown from "./LevelDropdown";
import TaskTitleInput from "./TaskTitleInput";
import { SelectChangeEvent, Stack, InputLabel, Box } from "@mui/material";
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
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TaskTitleInput
          currentTaskTitle={currentTaskTitle}
          onChange={setCurrentTaskTitle}
        />

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Stack spacing={1} flex={1}>
            <InputLabel sx={{ fontWeight: 500, color: "#475569" }}>
              Anxiety Level
            </InputLabel>
            <LevelDropdown
              level={currentAnxietyLevel}
              onChange={handleAnxietyChange}
              label="Anxiety Level"
            />
          </Stack>

          <Stack spacing={1} flex={1}>
            <InputLabel sx={{ fontWeight: 500, color: "#475569" }}>
              Energy Level
            </InputLabel>
            <LevelDropdown
              level={currentEnergyLevel}
              onChange={handleEnergyChange}
              label="Energy Level"
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <StyledButton type="submit" size="large" onClick={handleSubmit}>
            Add Task
          </StyledButton>
          <StyledButton type="reset" size="large" onClick={handleReset}>
            Reset
          </StyledButton>
        </Stack>
      </Stack>
    </Box>
  );
}
