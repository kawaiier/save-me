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
      <Select
        value={level}
        onChange={onChange}
        sx={{
          borderRadius: "12px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e2e8f0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {},
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              marginTop: "8px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      >
        {LEVELS.map((level: Level) => (
          <MenuItem
            key={level}
            value={level}
            sx={{
              borderRadius: "8px",
              margin: "4px",
              "&:hover": {},
              "&.Mui-selected": {
                "&:hover": {},
              },
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{}}></div>
              <span className="capitalize font-medium">{level}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
