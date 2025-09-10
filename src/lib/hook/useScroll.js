import { useEffect } from "react";

export function useScroll(callback) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        callback();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
}
// 스크롤이 거의 끝까지 도달하면 callback함수를 호출하는 훅
