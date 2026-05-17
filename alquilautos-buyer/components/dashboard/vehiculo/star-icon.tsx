type StarIconProps = {
  type: "full" | "half" | "empty";
};

export default function StarIcon({ type }: StarIconProps) {
  if (type === "full") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-star)]" fill="currentColor">
        <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
      </svg>
    );
  }
  if (type === "half") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-star)]" fill="currentColor">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half)"
          stroke="currentColor"
          strokeWidth="1"
          d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[var(--border-strong)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
    </svg>
  );
}