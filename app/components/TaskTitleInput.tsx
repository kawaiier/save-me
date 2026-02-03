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
      placeholder="What's your task?"
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          backgroundColor: 'white',
          fontSize: '1.1rem',
          '& fieldset': {
            borderColor: '#e2e8f0',
          },
          '&:hover fieldset': {
            borderColor: '#0d9488',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0d9488',
            borderWidth: '2px',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '1.1rem',
        },
      }}
      InputProps={{
        sx: {
          padding: '16px',
        }
      }}
    />
  );
}
