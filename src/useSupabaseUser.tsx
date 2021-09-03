import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export function useSupabaseUser() {
  const [user, setUser] = useState<User | undefined>(
    () => supabase.auth.user() ?? undefined,
  )

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? undefined)
    })
    return () => {
      data?.unsubscribe()
    }
  }, [])

  return user
}
