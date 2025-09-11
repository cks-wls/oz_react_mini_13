import { useEffect, useRef } from "react";

export function useScroll(callback, delay = 2000) {
  // delay 기본 2초
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        if (timeoutRef.current) return; // 이미 지연중이면 무시

        timeoutRef.current = setTimeout(() => {
          callback(); // 실제 호출
          timeoutRef.current = null; // 리셋
        }, delay);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, delay]);
}
