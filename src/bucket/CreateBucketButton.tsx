import type { User } from "@supabase/supabase-js"
import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { extractErrorMessage } from "../common/helpers"
import { bucketQueryKey, createBucket } from "./data"

export function CreateBucketButton({ user }: { user: User }) {
  const client = useQueryClient()
  const mutation = useMutation(createBucket, {
    async onSuccess() {
      await client.invalidateQueries(bucketQueryKey)
    },
  })

  return (
    <>
      <button
        style={
          mutation.isLoading ? { opacity: 0.5, pointerEvents: "none" } : {}
        }
        onClick={() => {
          if (mutation.isLoading) return

          const name = window.prompt("Project name?")
          if (name) mutation.mutate({ name, ownerId: user.id })
        }}
      >
        create project
      </button>
      {mutation.isError && <p>{extractErrorMessage(mutation.error)}</p>}
    </>
  )
}
