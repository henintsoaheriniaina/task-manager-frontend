const AuthPlaceholder = () => (
  <div className="relative h-full w-full overflow-hidden bg-muted/20 flex items-center justify-center">
    <svg
      className="absolute inset-0 h-full w-full stroke-primary/10 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="auth-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="-1"
        >
          <path d="M.5 40V.5H40" fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#auth-pattern)"
      />
    </svg>

    <div className="relative flex flex-col items-center p-8 text-center space-y-4">
      <div className="size-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center rotate-3 shadow-2xl backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          className="size-12 text-primary animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="max-w-50">
        <h3 className="text-xl font-bold text-foreground/80">Power Tasks</h3>
        <p className="text-sm text-muted-foreground mt-1"></p>
      </div>
    </div>
  </div>
);
export default AuthPlaceholder;
