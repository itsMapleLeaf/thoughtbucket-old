import React from "react"
import { useQuery } from "react-query"
import { BucketSummary } from "./BucketSummary"
import { getBuckets } from "./data"

export function BucketList() {
  const query = useQuery({
    queryKey: ["buckets"],
    queryFn: () => getBuckets(),
  })

  return (
    <>
      {query.isLoading && <p>loading...</p>}
      <ul>
        {query.data?.map((bucket) => (
          <li key={bucket.id}>
            <BucketSummary bucket={bucket} />
          </li>
        ))}
      </ul>
    </>
  )
}
