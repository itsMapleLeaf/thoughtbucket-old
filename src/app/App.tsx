import React from "react"
import { Route, Router } from "wouter"
import { LoginForm } from "../auth/LoginForm"
import { useSession } from "../auth/useSession"
import { BucketPage } from "../bucket/BucketPage"
import { Home } from "./Home"

export function App() {
  const user = useSession()
  return user ? (
    <Router>
      <Route path="/">
        <Home user={user} />
      </Route>
      <Route path="/bucket/:bucketId">
        {(params) => <BucketPage bucketId={params.bucketId} />}
      </Route>
    </Router>
  ) : (
    <LoginForm />
  )
}
