export default function Footer() {
  return (
    <footer className="section-pad flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-xs text-fog sm:flex-row">
      <span>KKR. — Bengaluru, India</span>
      <span>© {new Date().getFullYear()} K Kumar Reddy. Built, learned, shipped.</span>
    </footer>
  );
}
