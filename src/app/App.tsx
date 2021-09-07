import React from "react"
import { Route } from "wouter"
import { AuthPage } from "../auth/AuthPage"
import { useUser } from "../auth/useUser"
import { BucketList } from "../bucket/BucketList"
import { BucketPage } from "../bucket/BucketPage"
import { DocumentTitle } from "../dom/DocumentTitle"
import { AppHeader } from "./AppHeader"

export function App() {
  const user = useUser()
  return (
    <DocumentTitle title="thoughtbucket">
      <div className="flex flex-col h-full">
        <AppHeader user={user} />
        <main className="flex-1 min-h-0 mt-6">
          {user ? (
            <>
              <Route path="/">
                <BucketList user={user} />
              </Route>
              <Route path="/bucket/:bucketId">
                {(params) => <BucketPage bucketId={params.bucketId} />}
              </Route>
            </>
          ) : (
            <AuthPage />
          )}
        </main>
      </div>
    </DocumentTitle>
  )
}
