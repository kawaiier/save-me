import type { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface TaskTitleInputProps {
  currentTaskTitle: string;
  onChange: (value: string) => void;
}

export default function TaskTitleInput({
  currentTaskTitle,
  onChange,
}: TaskTitleInputProps) {
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <TextField
      type="text"
      value={currentTaskTitle}
      onChange={handleTitleChange}
      sx={{ bgcolor: "#fff" }}
    />
  );
}
