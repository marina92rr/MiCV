"use client";

import { useEffect, useRef, useState } from "react";

// Para animar cuando entra en pantalla
export default function useView() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}