import { useRef } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const MAX_SEARCH_QUERY_LENGTH = 100;

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    // The clear button unmounts once the value is empty - without this the
    // browser would drop focus to <body>, silently stranding keyboard users.
    inputRef.current?.focus();
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search GitHub repositories…"
      value={value}
      onChange={(event) => onChange(event.target.value.slice(0, MAX_SEARCH_QUERY_LENGTH))}
      inputRef={inputRef}
      aria-label="Search GitHub repositories"
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
              <IconButton size="small" aria-label="Clear search" onClick={handleClear}>
                <ClearRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
