import React from "react"
import { useMutation } from "react-query"
import { deleteBucket } from "./data"

export function DeleteBucketButton(props: { id: string }) {
  const deleteMutation = useMutation(deleteBucket)
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
