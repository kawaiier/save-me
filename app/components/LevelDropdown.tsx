import { Level, LEVELS } from "../types";

interface LevelDropdownProps {
  level: Level;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function LevelDropdown({ level, onChange }: LevelDropdownProps) {
  return (
    <select
      className="p-2 rounded-md hover:cursor-pointer bg-gray-800 text-gray-300"
      value={level}
      onChange={onChange}
    >
      {LEVELS.map((level: Level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
}
