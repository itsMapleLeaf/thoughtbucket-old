import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { bucketQueryKey, deleteBucket } from "./data"

export function DeleteBucketButton(props: { id: string }) {
  const client = useQueryClient()
  const deleteMutation = useMutation(deleteBucket, {
    async onSuccess() {
      await client.invalidateQueries(bucketQueryKey)
    },
  })

  return (
    <button
      onClick={() => deleteMutation.mutate(props.id)}
      style={
        deleteMutation.isLoading ? { opacity: 0.5, pointerEvents: "none" } : {}
      }
    >
      delete
    </button>
  )
}
