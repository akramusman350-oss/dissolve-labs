import { useEffect, useRef, useState } from 'react';

export function useCountUp(
  target: number,
  options: { duration?: number; trigger?: boolean } = {}
) {
  const { duration = 1300, trigger = false } = options;
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return value;
}
