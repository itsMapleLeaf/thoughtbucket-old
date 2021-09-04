import React from "react"
import { Link } from "wouter"
import { DeleteBucketButton } from "./DeleteBucketButton"

export function BucketSummary({
  bucket,
}: {
  bucket: { id: string; name: string }
}) {
  return (
    <p>
      <Link to={`/bucket/${bucket.id}`}>{bucket.name}</Link>
      <DeleteBucketButton id={bucket.id} />
    </p>
  )
}
