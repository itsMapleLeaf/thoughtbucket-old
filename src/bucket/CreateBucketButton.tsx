import type { User } from "@supabase/supabase-js"
import React from "react"
import { useMutation, useQueryClient } from "react-query"
import type { ButtonProps } from "../dom/Button"
import { Button } from "../dom/Button"
import { bucketQueryKey, createBucket } from "./data"

export function CreateBucketButton({
  user,
  ...props
}: ButtonProps & { user: User }) {
  const client = useQueryClient()
  const mutation = useMutation(createBucket, {
    async onSuccess() {
      await client.invalidateQueries(bucketQueryKey)
    },
    onError(error) {
      alert(`something went wrong :( try again`)
      // eslint-disable-next-line no-console
      console.error(error)
    },
  })

  return (
    <>
      <Button
        {...props}
        disabled={props.disabled ?? mutation.isLoading}
        onClick={() => {
          if (props.disabled) return
          const name = window.prompt("Project name?")
          if (name) mutation.mutate({ name, ownerId: user.id })
        }}
      />
    </>
  )
}
