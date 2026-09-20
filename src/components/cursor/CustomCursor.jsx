import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks';

// ─── CustomCursor ────────────────────────────────────────────────
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    // Smooth ring via lerp in rAF
    const animate = () => {
      const dx = posRef.current.x - ringPos.current.x;
      const dy = posRef.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]');
      if (!el) return;

      const isBtn = el.tagName === 'BUTTON' || el.closest('button') !== null;
      dot.classList.toggle('cursor-button', isBtn);
      ring.classList.toggle('cursor-button', isBtn);
      dot.classList.toggle('cursor-hover', !isBtn);
      ring.classList.toggle('cursor-hover', !isBtn);
    };

    const onLeaveInteractive = () => {
      dot.classList.remove('cursor-hover', 'cursor-button');
      ring.classList.remove('cursor-hover', 'cursor-button');
    };

    const onLeaveWindow = () => {
      dot.classList.add('cursor-hidden');
      ring.classList.add('cursor-hidden');
    };

    const onEnterWindow = () => {
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
    };

    document.addEventListener('mousemove',   onMove);
    document.addEventListener('mouseover',   onEnterInteractive);
    document.addEventListener('mouseout',    onLeaveInteractive);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onEnterWindow);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onEnterInteractive);
      document.removeEventListener('mouseout',   onLeaveInteractive);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onEnterWindow);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
