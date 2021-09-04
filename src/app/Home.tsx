import type { User } from "@supabase/supabase-js"
import React from "react"
import { useQuery } from "react-query"
import { BucketSummary } from "../bucket/BucketSummary"
import { CreateBucketButton } from "../bucket/CreateBucketButton"
import { getBuckets } from "../bucket/data"
import { supabase } from "../supabase/client"

export function Home({ user }: { user: User }) {
  const query = useQuery({
    queryKey: ["buckets"],
    queryFn: () => getBuckets(),
  })

  return (
    <main>
      <p>user id: {user.id}</p>

      <CreateBucketButton user={user} onSuccess={() => query.refetch()} />

      <button type="button" onClick={() => supabase.auth.signOut()}>
        log out
      </button>

      {query.isLoading && <p>loading...</p>}
      <ul>
        {query.data?.map((bucket) => (
          <li key={bucket.id}>
            <BucketSummary
              bucket={bucket}
              onDeleteSuccess={() => query.refetch()}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
