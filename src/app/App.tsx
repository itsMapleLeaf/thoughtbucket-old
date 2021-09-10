import React from "react"
import { Redirect, Route, Switch } from "wouter"
import { LoginPage } from "../auth/LoginPage"
import { SignupPage } from "../auth/SignupPage"
import { useAuthUser } from "../auth/useUser"
import { BucketList } from "../bucket/BucketList"
import { BucketPage } from "../bucket/BucketPage"
import { DocumentTitle } from "../dom/DocumentTitle"
import { AppHeader } from "./AppHeader"

export function App() {
  const user = useAuthUser()

  return (
    <DocumentTitle title="thoughtbucket">
      <div className="flex flex-col h-full">
        <AppHeader user={user} />
        <main className="flex-1 min-h-0 mt-6">
          {user ? (
            <Switch>
              <Route path="/">
                <BucketList user={user} />
              </Route>
              <Route path="/bucket/:bucketId">
                {(params) => <BucketPage bucketId={params.bucketId} />}
              </Route>
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    </DocumentTitle>
  )
}
