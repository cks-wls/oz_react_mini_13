import { useEffect, useState } from "react";

function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 800);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
}
// 800ms 뒤에 API요청이 들어오는 훅 구현
export default useDebounce;
