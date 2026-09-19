import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebouncedValue } from "@repo-radar/core";

const DEBOUNCE_MS = 400;

export function useSearchBox() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const onSearchRoute = location.pathname === "/search";
  const urlQuery = onSearchRoute ? (searchParams.get("q") ?? "") : "";

  const [inputValue, setInputValue] = useState(urlQuery);
  const debouncedValue = useDebouncedValue(inputValue, DEBOUNCE_MS).trim();

  // Tracks the query text WE last pushed, so the two effects below can tell
  // "URL changed because we navigated" apart from "URL changed via back/forward
  // or a deep link" — without that, they'd fight each other in a loop.
  const lastPushedQuery = useRef(urlQuery);
  const wasOnSearchRoute = useRef(onSearchRoute);

  useEffect(() => {
    wasOnSearchRoute.current = onSearchRoute;
  }, [onSearchRoute]);

  // Sync FROM the URL (back/forward, deep link) takes priority over syncing
  // TO the URL (debounced typing) — both branches live in one effect so that
  // an external navigation is never second-guessed by a same-commit read of
  // a debouncedValue that hasn't caught up yet (it lags inputValue by up to
  // DEBOUNCE_MS). Without this, the two directions raced: right after
  // landing on "/" via the back button, this effect would see the still-stale
  // debouncedValue disagree with the just-updated ref and re-navigate forward,
  // undoing the back — self-correcting only once the debounce timer caught up.
  useEffect(() => {
    if (urlQuery !== lastPushedQuery.current) {
      lastPushedQuery.current = urlQuery;
      setInputValue(urlQuery);
      return;
    }

    if (debouncedValue === lastPushedQuery.current) return;
    lastPushedQuery.current = debouncedValue;

    if (debouncedValue.length === 0) {
      navigate("/", { replace: true });
      return;
    }
    const params = new URLSearchParams({ q: debouncedValue, page: "1" });
    navigate(
      { pathname: "/search", search: `?${params.toString()}` },
      { replace: wasOnSearchRoute.current },
    );
  }, [urlQuery, debouncedValue, navigate]);

  return { inputValue, setInputValue };
}
