import React from "react"
import { useMutation, useQueryClient } from "react-query"
import type { ButtonProps } from "../dom/Button"
import { Button } from "../dom/Button"
import { bucketQueryKey, deleteBucket } from "./data"

export function DeleteBucketButton({
  bucketId,
  ...props
}: ButtonProps & { bucketId: string }) {
  const client = useQueryClient()
  const deleteMutation = useMutation(deleteBucket, {
    async onSuccess() {
      await client.invalidateQueries(bucketQueryKey)
    },
  })

  return (
    <Button
      {...props}
      onClick={() => deleteMutation.mutate(bucketId)}
      disabled={deleteMutation.status === "loading"}
    />
  )
}
