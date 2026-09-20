import { useState, useEffect, useRef } from 'react';

// ─── useLocalStorage ────────────────────────────────────────────
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`useLocalStorage: could not set "${key}"`, error);
    }
  };

  return [storedValue, setValue];
}

// ─── useMediaQuery ──────────────────────────────────────────────
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ─── useIsMobile / useIsTablet ──────────────────────────────────
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
  return useMediaQuery('(max-width: 1023px)');
}

// ─── useDebounce ────────────────────────────────────────────────
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useClickOutside ────────────────────────────────────────────
export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [callback]);

  return ref;
}

// ─── useScrollReveal ────────────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ─── useCountUp ─────────────────────────────────────────────────
export function useCountUp(end, duration = 1500, start = 0) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const frameRef = useRef(null);

  const run = () => {
    setIsRunning(true);
    const startTime = performance.now();
    const range = end - start;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + range * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setIsRunning(false);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { count, run, isRunning };
}

// ─── useSidebar ─────────────────────────────────────────────────
export function useSidebar(defaultCollapsed = false) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    'foodsense-sidebar-collapsed',
    defaultCollapsed
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = () => {
    if (isMobile) {
      setMobileOpen((v) => !v);
    } else {
      setIsCollapsed((v) => !v);
    }
  };

  const close = () => setMobileOpen(false);

  return { isCollapsed, mobileOpen, toggle, close, setIsCollapsed };
}
