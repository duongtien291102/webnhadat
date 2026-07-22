interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({ children, className }: RevealProps) {
  // Content must remain visible even when animation frames or IntersectionObserver
  // callbacks are throttled by the browser during the initial page load.
  return <div className={className}>{children}</div>;
}
