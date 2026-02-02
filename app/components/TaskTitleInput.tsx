import type { ChangeEvent } from "react";

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
    <input
      type="text"
      value={currentTaskTitle}
      onChange={handleTitleChange}
      className="border border-gray-300 rounded-md px-2 py-1 w-full"
    />
  );
}
