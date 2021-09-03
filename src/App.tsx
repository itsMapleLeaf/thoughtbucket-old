import React from "react"
import { Home } from "./Home"
import { LoginForm } from "./LoginForm"
import { useSupabaseUser } from "./useSupabaseUser"

export function App() {
  const user = useSupabaseUser()
  return user ? <Home user={user} /> : <LoginForm />
}
