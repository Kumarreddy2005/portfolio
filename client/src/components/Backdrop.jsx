export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="ambient-light ambient-light--one" />
      <div className="ambient-light ambient-light--two" />
      <div className="ambient-light ambient-light--three" />
    </div>
  );
}
