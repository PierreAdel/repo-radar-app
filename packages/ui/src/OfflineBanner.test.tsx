import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OfflineBanner } from "./OfflineBanner";

describe("OfflineBanner", () => {
  it("renders an offline status message", () => {
    render(<OfflineBanner />);
    expect(screen.getByRole("status")).toHaveTextContent(/you.?re offline/i);
  });
});
