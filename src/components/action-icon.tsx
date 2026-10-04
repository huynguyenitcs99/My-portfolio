export function ActionIcon({
  name = "arrow",
  className = "",
}: {
  name?:
    | "arrow"
    | "down"
    | "up"
    | "back"
    | "right"
    | "close"
    | "pause"
    | "play"
    | "spark";
  className?: string;
}) {
  const path = {
    arrow: "M5 19 19 5M5 5h14v14",
    down: "M12 3v18m-7-7 7 7 7-7",
    up: "M12 21V3m-7 7 7-7 7 7",
    back: "M21 12H3m7-7-7 7 7 7",
    right: "M3 12h18m-7-7 7 7-7 7",
    close: "m5 5 14 14M5 19 19 5",
    pause: "M8 4v16M16 4v16",
    play: "m7 4 13 8-13 8Z",
    spark: "M12 3c0 6-3 9-9 9 6 0 9 3 9 9 0-6 3-9 9-9-6 0-9-3-9-9Z",
  }[name];
  return (
    <svg
      className={`action-icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
