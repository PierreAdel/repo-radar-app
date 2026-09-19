import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search GitHub repositories…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value.length > 0 && (
            <InputAdornment position="end">
              <IconButton size="small" aria-label="Clear search" onClick={() => onChange("")}>
                <ClearRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
