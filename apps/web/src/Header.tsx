import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { githubApi, selectThemeMode, selectTrackedFullNames, toggleTheme } from "@repo-radar/core";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { SearchBar } from "./features/search/SearchBar";
import { useSearchBox } from "./features/search/useSearchBox";

export function Header() {
  const dispatch = useAppDispatch();
  const trackedFullNames = useAppSelector(selectTrackedFullNames);
  const themeMode = useAppSelector(selectThemeMode);
  const { inputValue, setInputValue } = useSearchBox();

  const handleRefreshAll = () => {
    dispatch(
      githubApi.util.invalidateTags(
        trackedFullNames.map((fullName) => ({ type: "Repo" as const, id: fullName })),
      ),
    );
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(8px)" }}
    >
      <Toolbar sx={{ gap: 2.5, flexWrap: "wrap", py: 2 }}>
        <RadarRoundedIcon color="primary" />
        <Box sx={{ mr: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.1}>
            Repo Radar
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Search, track, and monitor GitHub repositories
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: 220 }}>
          <SearchBar value={inputValue} onChange={setInputValue} />
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<RefreshRoundedIcon />}
          onClick={handleRefreshAll}
          disabled={trackedFullNames.length === 0}
        >
          Refresh all
        </Button>
        <Tooltip title={themeMode === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {themeMode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
