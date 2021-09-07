import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import React from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { extractErrorMessage, range } from "../common/helpers"
import { DateTime } from "../dom/DateTime"
import { DocumentTitle } from "../dom/DocumentTitle"
import { fadedButtonClass } from "../ui/button"
import { maxWidthContainerClass } from "../ui/container"
import { leftButtonIconClass } from "../ui/icon"
import { bucketQueryKey, getBucketDetails } from "./data"
import { DeleteBucketButton } from "./DeleteBucketButton"
import { RenameBucketButton } from "./RenameBucketButton"

export function BucketPage({ bucketId }: { bucketId: string }) {
  const query = useQuery({
    queryKey: [bucketQueryKey, bucketId],
    queryFn: () => getBucketDetails(bucketId),
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
      <div className="flex flex-col h-full">
        <section
          className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 ${maxWidthContainerClass}`}
        >
          <div className="mr-auto">
            <h1 className="text-2xl font-light">{query.data.name}</h1>
            <p className="italic lowercase opacity-60">
              created on{" "}
              <DateTime
                date={query.data.createdAt}
                dateStyle="long"
                timeStyle="short"
              />
            </p>
          </div>

          <div className="flex gap-4">
            <RenameBucketButton
              bucket={query.data}
              className={fadedButtonClass}
            >
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
        </section>

        <section className="grid grid-flow-col gap-4 p-4 auto-cols-[18rem] grid-rows-1 mx-auto min-w-[min(1024px,100%)] max-w-full overflow-x-auto flex-1 overflow-y-auto min-h-0">
          {range(0, 3).map((groupIndex) => (
            <div
              key={groupIndex}
              className="flex flex-col p-3 bg-gray-900 rounded-lg shadow-inner"
            >
              <h3 className="mb-3 text-lg font-light leading-tight">
                group {groupIndex + 1}
              </h3>

              <div className="grid items-start content-start flex-1 min-h-0 gap-3 overflow-y-auto transform-gpu">
                <div className="p-2 bg-gray-800 border-l-4 border-blue-400 rounded-sm shadow">
                  Anim voluptate minim cupidatat fugiat incididunt nulla
                  adipisicing.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-green-400 rounded-sm shadow">
                  Adipisicing id amet amet id non occaecat pariatur amet tempor
                  esse commodo deserunt pariatur.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-red-400 rounded-sm shadow">
                  In aliquip nulla fugiat laborum adipisicing veniam eiusmod
                  labore cillum mollit excepteur esse commodo labore.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-yellow-400 rounded-sm shadow">
                  Amet mollit Lorem aliquip incididunt veniam qui id deserunt
                  occaecat non.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-purple-400 rounded-sm shadow">
                  Nulla reprehenderit consequat nisi aute aliquip duis cupidatat
                  aliqua aute ipsum tempor cupidatat.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-red-400 rounded-sm shadow">
                  In aliquip nulla fugiat laborum adipisicing veniam eiusmod
                  labore cillum mollit excepteur esse commodo labore.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-yellow-400 rounded-sm shadow">
                  Amet mollit Lorem aliquip incididunt veniam qui id deserunt
                  occaecat non.
                </div>
                <div className="p-2 bg-gray-800 border-l-4 border-purple-400 rounded-sm shadow">
                  Nulla reprehenderit consequat nisi aute aliquip duis cupidatat
                  aliqua aute ipsum tempor cupidatat.
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </DocumentTitle>
  )
}
