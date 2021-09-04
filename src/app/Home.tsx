import type { User } from "@supabase/supabase-js"
import React from "react"
import { BucketList } from "../bucket/BucketList"
import { CreateBucketButton } from "../bucket/CreateBucketButton"
import { supabase } from "../supabase/client"

export function Home({ user }: { user: User }) {
  return (
    <main>
      <p>user id: {user.id}</p>
      <CreateBucketButton user={user} />
      <button type="button" onClick={() => supabase.auth.signOut()}>
        log out
      </button>
      <BucketList />
    </main>
  )
}
