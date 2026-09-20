import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const MAX_SEARCH_QUERY_LENGTH = 100;

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
      onChange={(event) => onChange(event.target.value.slice(0, MAX_SEARCH_QUERY_LENGTH))}
      slotProps={{
        htmlInput: { maxLength: MAX_SEARCH_QUERY_LENGTH },
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
