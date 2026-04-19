"use client";

import { useEffect, useRef, useState } from "react";

export default function useOpenClose(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const contentRef = useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    const handleClickOutside = (e) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    contentRef,
  };
}