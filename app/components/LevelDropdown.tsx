import { Level, LEVELS } from "../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

interface LevelDropdownProps {
  level: Level;
  onChange: (event: SelectChangeEvent) => void;
  label: string;
}

export default function LevelDropdown({
  level,
  onChange,
  label,
}: LevelDropdownProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select value={level} id={label} onChange={onChange}>
        {LEVELS.map((level: Level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
