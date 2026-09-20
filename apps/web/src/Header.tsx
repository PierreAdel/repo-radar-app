import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { githubApi, selectThemeMode, selectTrackedFullNames, toggleTheme } from "@repo-radar/core";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { SearchBar } from "./features/search/SearchBar";
import { useSearchBox } from "./features/search/useSearchBox";

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const goHome = () => {
    setInputValue("");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(8px)" }}
    >
      <Toolbar disableGutters sx={{ py: 2 }}>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", alignItems: "center", gap: 2.5, flexWrap: "wrap" }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={goHome}
            sx={{ cursor: "pointer", mr: 2 }}
          >
            <RadarRoundedIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" fontWeight={700} lineHeight={1.1}>
                Repo Radar
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Search, track, and monitor GitHub repositories
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <SearchBar value={inputValue} onChange={setInputValue} />
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Refresh all">
              <span style={{ display: "contents" }}>
                <IconButton
                  sx={{ display: { xs: "inline-flex", md: "none" } }}
                  onClick={handleRefreshAll}
                  disabled={trackedFullNames.length === 0}
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Button
              variant="contained"
              size="small"
              startIcon={<RefreshRoundedIcon />}
              onClick={handleRefreshAll}
              disabled={trackedFullNames.length === 0}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Refresh all
            </Button>
            <Tooltip
              title={themeMode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <IconButton onClick={() => dispatch(toggleTheme())}>
                {themeMode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
