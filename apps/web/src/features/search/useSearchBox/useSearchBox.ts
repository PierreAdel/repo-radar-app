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

  const lastPushedQuery = useRef(urlQuery);
  const wasOnSearchRoute = useRef(onSearchRoute);

  useEffect(() => {
    wasOnSearchRoute.current = onSearchRoute;
  }, [onSearchRoute]);

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
