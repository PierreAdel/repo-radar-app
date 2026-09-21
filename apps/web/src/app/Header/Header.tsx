import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { githubApi, selectThemeMode, selectTrackedFullNames, toggleTheme } from "@repo-radar/core";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SearchBar } from "../../features/search/SearchBar/SearchBar";
import { useSearchBox } from "../../features/search/useSearchBox/useSearchBox";

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
          <ButtonBase
            onClick={goHome}
            aria-label="Repo Radar — go to dashboard"
            sx={{ mr: 2, borderRadius: 1, p: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <RadarRoundedIcon color="primary" />
              <Box sx={{ textAlign: "left" }}>
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
          </ButtonBase>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <SearchBar value={inputValue} onChange={setInputValue} />
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Refresh all">
              {/* MUI clones its aria-label onto this wrapper span (needed so the
                  tooltip still triggers when the real button is disabled) — but a
                  span has no role, so that aria-label is itself invalid ARIA usage.
                  The IconButton below carries its own aria-label instead; this
                  explicit override stops Tooltip from also placing one here. */}
              <span aria-label={undefined} style={{ display: "contents" }}>
                <IconButton
                  aria-label="Refresh all"
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
