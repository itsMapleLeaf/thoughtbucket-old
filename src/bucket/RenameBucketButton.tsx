import React from "react"
import { useMutation, useQueryClient } from "react-query"
import type { ButtonProps } from "../dom/Button"
import { Button } from "../dom/Button"
import { bucketQueryKey, renameBucket } from "./data"

export function RenameBucketButton({
  bucket,
  onSuccess,
  ...props
}: ButtonProps & {
  bucket: { id: string; name: string }
  onSuccess?: () => void
}) {
  const client = useQueryClient()

  const mutation = useMutation(renameBucket, {
    async onSuccess() {
      onSuccess?.()
      await client.invalidateQueries(bucketQueryKey)
    },
  })

  return (
    <Button
      {...props}
      onClick={() => {
        const newName = prompt("new name?", bucket.name)
        if (!newName) return
        mutation.mutate({ id: bucket.id, name: newName })
      }}
      disabled={mutation.status === "loading"}
    />
  )
}
