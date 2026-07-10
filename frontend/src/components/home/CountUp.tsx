'use client';

import { useEffect, useState, useRef } from 'react';

export default function CountUp({ target, isInView }: { target: number; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (isInView && !hasRun.current) {
      hasRun.current = true;
      const duration = 2000;
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return <>{count}</>;
}
