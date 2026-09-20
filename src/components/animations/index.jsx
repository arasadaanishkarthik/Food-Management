import { useEffect, useRef } from 'react';
import { cn } from '@/utils';

// ─── FadeIn wrapper ──────────────────────────────────────────────
export function FadeIn({ children, delay = 0, duration = 400, className, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn('animate-fade-in', className)}
      style={{ animationDelay: `${delay}ms`, animationDuration: `${duration}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── FadeUp wrapper ──────────────────────────────────────────────
export function FadeUp({ children, delay = 0, duration = 500, className, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn('animate-fade-up', className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
        opacity: 0,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── SlideIn wrapper ─────────────────────────────────────────────
export function SlideIn({ children, direction = 'left', delay = 0, className, ...props }) {
  const animClass = direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';
  return (
    <div
      className={cn(animClass, className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── ScrollReveal ────────────────────────────────────────────────
export function ScrollReveal({ children, delay = 0, threshold = 0.1, className, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

// ─── StaggerContainer ────────────────────────────────────────────
export function StaggerContainer({ children, stagger = 80, baseDelay = 0, as: Tag = 'div', className, ...props }) {
  return (
    <Tag className={className} {...props}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <FadeUp key={i} delay={baseDelay + i * stagger}>
              {child}
            </FadeUp>
          ))
        : <FadeUp delay={baseDelay}>{children}</FadeUp>
      }
    </Tag>
  );
}

// ─── ScaleIn ─────────────────────────────────────────────────────
export function ScaleIn({ children, delay = 0, className, ...props }) {
  return (
    <div
      className={cn('animate-scale-in', className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── BlurReveal ──────────────────────────────────────────────────
export function BlurReveal({ children, delay = 0, className, ...props }) {
  return (
    <div
      className={cn('animate-blur-in', className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both', opacity: 0 }}
      {...props}
    >
      {children}
    </div>
  );
}
