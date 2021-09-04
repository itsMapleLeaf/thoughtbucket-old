import React from "react"
import { LoginForm } from "../auth/LoginForm"
import { useSession } from "../auth/useSession"
import { Home } from "./Home"

export function App() {
  const user = useSession()
  return user ? <Home user={user} /> : <LoginForm />
}
