import React from "react"
import { useMutation, useQueryClient } from "react-query"
import type { ButtonProps } from "../dom/Button"
import { Button } from "../dom/Button"
import { bucketQueryKey, deleteBucket } from "./data"

export function DeleteBucketButton({
  bucketId,
  onSuccess,
  ...props
}: ButtonProps & {
  bucketId: string
  onSuccess?: () => void
}) {
  const client = useQueryClient()
  const deleteMutation = useMutation(deleteBucket, {
    async onSuccess() {
      onSuccess?.()
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
