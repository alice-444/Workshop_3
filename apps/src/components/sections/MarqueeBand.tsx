const WOODS = "Contre plaqué de 5mm · Meranti";

export default function MarqueeBand() {
  return (
    <>
      <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="h-12 flex items-center overflow-hidden bg-muted/50" aria-hidden="true">
        <div
          className="whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-light"
          style={{ fontFamily: "var(--font-body)", animation: "marquee 40s linear infinite" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>&nbsp;&nbsp;&nbsp;{WOODS}&nbsp;&nbsp;&nbsp;·</span>
          ))}
        </div>
      </div>
      <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </>
  );
}
