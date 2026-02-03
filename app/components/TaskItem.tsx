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
import { Box, Modal, Typography } from "@mui/material";
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
  border: "2px solid #000",
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
    <div className="flex gap-2 items-center flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Checkbox
          checked={task.done}
          onChange={() => onToggleDone(task.id)}
          color="success"
          sx={{
            bgcolor: "#fefefe",
            ":hover": {
              bgcolor: "#f1f1f1",
            },
          }}
        />
        <p title={task.id.toString()}>{task.title}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <LevelLabel currentLevel={anxietyLevel}>
          <Tooltip title="Anxiety level">
            <PsychologyAltIcon />
          </Tooltip>
        </LevelLabel>
        <LevelLabel currentLevel={energyLevel}>
          <Tooltip title="Energy level">
            <ElectricBoltIcon />
          </Tooltip>
        </LevelLabel>
        {anxietyLevel != "low" && (
          <Tooltip title="I need help with this task">
            <IconButton color="primary" onClick={handleOpen}>
              <PsychologyAltIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete the task">
          <IconButton color="error" onClick={() => onDeleteTask(task.id)}>
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              I'll help you with task
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Just do it ;)
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
