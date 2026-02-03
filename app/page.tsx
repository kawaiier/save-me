"use client";
import TaskCreator from "./components/TaskCreator";
import TaskItem from "./components/TaskItem";
import { useEffect, useState } from "react";
import { Task, Level, LEVELS } from "./types";
import StyledButton from "./components/Button";
import {
  Container,
  Paper,
  Box,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

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
      ? "success"
      : totalStressScore <= 100
        ? "warning"
        : "error";

  const stressMessage =
    totalStressScore <= 50
      ? "Great job! Keep up the good work."
      : totalStressScore <= 100
        ? "You're doing well, but there's room for improvement."
        : "Think of decreasing your workload for today.";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #ccfbf1 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Save Me
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#64748b", fontWeight: 500 }}
          >
            A stress-reducing to-do app
          </Typography>
          <Divider
            sx={{
              width: 96,
              mx: "auto",
              mt: 2,
              borderColor: "#14b8a6",
              borderWidth: 2,
              borderRadius: 1,
            }}
          />
        </Box>

        <Stack spacing={3}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#475569", mb: 1, fontWeight: 600 }}
            >
              Current Stress Score
            </Typography>
            <Typography
              variant="h2"
              color={scoreColor}
              sx={{
                fontWeight: 700,
                mb: 1,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {totalStressScore}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#64748b", fontWeight: 500 }}
            >
              {stressMessage}
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <TaskCreator
              currentTaskTitle={currentTaskTitle}
              setCurrentTaskTitle={setCurrentTaskTitle}
              onAddTask={onAddTask}
              currentEnergyLevel={currentEnergyLevel}
              currentAnxietyLevel={currentAnxietyLevel}
              setCurrentEnergyLevel={setCurrentEnergyLevel}
              setCurrentAnxietyLevel={setCurrentAnxietyLevel}
            />
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{
                textAlign: "center",
                color: "#1e293b",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Your Tasks
            </Typography>

            {tasksList.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  🧘
                </Typography>
                <Typography variant="body1" sx={{ color: "#64748b" }}>
                  No tasks yet. Time to relax!
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {tasksList.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleDone={onToggleDone}
                    onDeleteTask={onDeleteTask}
                    energyLevel={task.energyLevel}
                    anxietyLevel={task.anxietyLevel}
                  />
                ))}
              </Stack>
            )}
          </Paper>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <StyledButton onClick={onDeleteDone} type="reset" size="large">
              Clear Completed
            </StyledButton>
            <StyledButton onClick={onDeleteAll} type="reset" size="large">
              Clear All
            </StyledButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
