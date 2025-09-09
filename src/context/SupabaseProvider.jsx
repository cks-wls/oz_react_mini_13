import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

// supabase 로그인 유지 세션 생성
export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL, // Supabase Project URL
  import.meta.env.VITE_SUPABASE_API_KEY // Supabase API Key
);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    new Error("supabase가 초기화 되지 않았습니다.");
    return;
  }
  return supabase;
};
