import React from "react"
import { DeleteBucketButton } from "./DeleteBucketButton"

export function BucketSummary({
  bucket,
}: {
  bucket: { id: string; name: string }
}) {
  return (
    <p>
      <span>{bucket.name}</span>
      <DeleteBucketButton id={bucket.id} />
    </p>
  )
}
