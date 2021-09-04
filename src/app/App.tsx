import React from "react"
import { Route } from "wouter"
import { LoginForm } from "../auth/LoginForm"
import { useUser } from "../auth/useUser"
import { BucketList } from "../bucket/BucketList"
import { BucketPage } from "../bucket/BucketPage"
import { maxWidthContainerClass } from "../ui/container"
import { AppHeader } from "./AppHeader"

export function App() {
  const user = useUser()
  return (
    <>
      <AppHeader user={user} />
      <main className={`${maxWidthContainerClass} mt-6`}>
        {user ? (
          <>
            <Route path="/">
              <BucketList />
            </Route>
            <Route path="/bucket/:bucketId">
              {(params) => <BucketPage bucketId={params.bucketId} />}
            </Route>
          </>
        ) : (
          <LoginForm />
        )}
      </main>
    </>
  )
}
