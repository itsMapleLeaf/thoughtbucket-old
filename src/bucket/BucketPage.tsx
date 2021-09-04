import React from "react"
import { useQuery } from "react-query"
import { extractErrorMessage } from "../common/helpers"
import { getBucketDetails } from "./data"

export function BucketPage(props: { bucketId: string }) {
  const query = useQuery({
    queryKey: ["bucket", props.bucketId],
    queryFn: () => getBucketDetails(props.bucketId),
  })

  if (query.isLoading) {
    return <p>Loading...</p>
  }

  if (query.error) {
    return <p>Error: {extractErrorMessage(query.error)}</p>
  }

  if (!query.data) {
    return <p>Bucket not found</p>
  }

  return (
    <div>
      <h1>{query.data.name}</h1>
      <p>
        created on{" "}
        {new Date(query.data.created_at).toLocaleString(undefined, {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </p>
    </div>
  )
}
