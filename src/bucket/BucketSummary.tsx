import React from "react"
import { useMutation } from "react-query"
import { deleteBucket } from "./data"

export function BucketSummary({
  bucket,
  onDeleteSuccess,
}: {
  bucket: { id: string; name: string }
  onDeleteSuccess: () => void
}) {
  const deleteMutation = useMutation(deleteBucket, {
    onSuccess: onDeleteSuccess,
  })

  return (
    <p>
      <span>{bucket.name}</span>
      <button
        onClick={() => deleteMutation.mutate(bucket.id)}
        style={
          deleteMutation.isLoading
            ? { opacity: 0.5, pointerEvents: "none" }
            : {}
        }
      >
        delete
      </button>
    </p>
  )
}
