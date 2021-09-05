import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import React from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { extractErrorMessage } from "../common/helpers"
import { DateTime } from "../dom/DateTime"
import { DocumentTitle } from "../dom/DocumentTitle"
import { fadedButtonClass } from "../ui/button"
import { leftButtonIconClass } from "../ui/icon"
import { bucketQueryKey, getBucketDetails } from "./data"
import { DeleteBucketButton } from "./DeleteBucketButton"
import { RenameBucketButton } from "./RenameBucketButton"

export function BucketPage(props: { bucketId: string }) {
  const query = useQuery({
    queryKey: [bucketQueryKey, props.bucketId],
    queryFn: () => getBucketDetails(props.bucketId),
  })

  const [, setLocation] = useLocation()

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
    <DocumentTitle title={query.data.name}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <div className="mr-auto">
          <h1 className="text-2xl font-light">{query.data.name}</h1>
          <p className="italic lowercase opacity-60">
            created on{" "}
            <DateTime
              date={query.data.created_at}
              dateStyle="long"
              timeStyle="short"
            />
          </p>
        </div>

        <div className="flex gap-4">
          <RenameBucketButton bucket={query.data} className={fadedButtonClass}>
            <PencilAltIcon className={leftButtonIconClass} /> rename
          </RenameBucketButton>
          <DeleteBucketButton
            className={fadedButtonClass}
            bucket={query.data}
            onSuccess={() => setLocation("/")}
          >
            <TrashIcon className={leftButtonIconClass} /> delete
          </DeleteBucketButton>
        </div>
      </div>
    </DocumentTitle>
  )
}
