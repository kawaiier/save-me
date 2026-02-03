import { Task } from "../types";
import { Level, LEVELS } from "../types";
import LevelLabel from "./LevelLabel";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Paper, Box, Modal, Typography, Stack } from "@mui/material";
import { useState } from "react";

interface TaskProps {
  task: Task;
  onToggleDone: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  energyLevel: Level;
  anxietyLevel: Level;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function TaskItem({
  task,
  onToggleDone,
  onDeleteTask,
  energyLevel,
  anxietyLevel,
}: TaskProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const energyScore = 10 * (LEVELS.indexOf(energyLevel) + 1);
  const anxietyScore = 10 * (LEVELS.indexOf(anxietyLevel) + 1);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: task.done ? "#86efac" : "#e2e8f0",
        bgcolor: task.done ? "#f0fdf4" : "white",
        opacity: task.done ? 0.75 : 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center" flex={1} minWidth={0}>
          <Checkbox
            checked={task.done}
            onChange={() => onToggleDone(task.id)}
            color="success"
            sx={{
              padding: "8px",
              "& .MuiSvgIcon-root": {
                fontSize: "22px",
              },
            }}
          />
          <Typography
            title={task.id.toString()}
            sx={{
              fontWeight: 500,
              color: task.done ? "#64748b" : "#1e293b",
              textDecoration: task.done ? "line-through" : "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
          <LevelLabel currentLevel={anxietyLevel}>
            <Tooltip title="Anxiety level">
              <PsychologyAltIcon sx={{ color: "#8b5cf6" }} />
            </Tooltip>
          </LevelLabel>
          <LevelLabel currentLevel={energyLevel}>
            <Tooltip title="Energy level">
              <ElectricBoltIcon sx={{ color: "#eab308" }} />
            </Tooltip>
          </LevelLabel>
          {anxietyLevel !== "low" && (
            <Tooltip title="I need help with this task">
              <IconButton
                color="primary"
                onClick={handleOpen}
                sx={{
                  color: "#8b5cf6",
                  "&:hover": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
                }}
              >
                <PsychologyIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete the task">
            <IconButton
              color="error"
              onClick={() => onDeleteTask(task.id)}
              sx={{
                "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" },
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#1e293b", fontWeight: 600 }}>
            I'll help you with this task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: "#64748b" }}>
            Take a deep breath and break it down into smaller steps. You've got this!
          </Typography>
        </Box>
      </Modal>
    </Paper>
  );
}
