// MUI's sx treats bare numbers for width/height as fractions (1 -> "100%"),
// not px, so these need explicit units or the "1x1px" box becomes full-size
// and inflates the page's scrollable area even though it stays invisible.
export const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;
