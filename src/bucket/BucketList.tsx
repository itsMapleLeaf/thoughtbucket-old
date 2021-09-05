import React from "react"
import { useQuery } from "react-query"
import { DocumentTitle } from "../dom/DocumentTitle"
import { BucketSummaryCard } from "./BucketSummaryCard"
import { bucketQueryKey, getBuckets } from "./data"

export function BucketList() {
  const query = useQuery({
    queryKey: [bucketQueryKey],
    queryFn: () => getBuckets(),
  })

  return (
    <DocumentTitle title="buckets">
      {query.isLoading && <p>loading...</p>}
      <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
        {query.data?.map((bucket) => (
          <li key={bucket.id}>
            <BucketSummaryCard bucket={bucket} />
          </li>
        ))}
      </ul>
    </DocumentTitle>
  )
}
