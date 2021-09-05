import type { User } from "@supabase/supabase-js"
import React from "react"
import { useQueryClient } from "react-query"
import { useLocation } from "wouter"
import type { ButtonProps } from "../dom/Button"
import { MutationButton } from "../state/MutationButton"
import { bucketQueryKey, createBucket } from "./data"

export function CreateBucketButton({
  user,
  ...props
}: ButtonProps & { user: User }) {
  const client = useQueryClient()
  const [, setLocation] = useLocation()

  return (
    <MutationButton
      {...props}
      mutateFn={createBucket}
      getVariables={() => {
        const name = window.prompt("name?")
        if (name) return { name, ownerId: user.id }
      }}
      onSuccess={({ data }) => {
        client.invalidateQueries(bucketQueryKey)
        setLocation(`/bucket/${data.id}`)
      }}
    />
  )
}
