export function UIIcon({
  name,
}: {
  name: "mail" | "calendar" | "context" | "priorities" | "chat";
}) {
  const paths = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18M7 14h3m4 0h3m-10 4h3" />
      </>
    ),
    context: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),
    priorities: <path d="M5 5h14M5 10h10M5 15h14M5 20h8" />,
    chat: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="3" />
        <path d="m7 17-2 4 7-4M7 8h10M7 12h6" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
