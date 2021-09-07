import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"
import React from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation } from "wouter"
import { extractErrorMessage } from "../common/helpers"
import { Button } from "../dom/Button"
import { DateTime } from "../dom/DateTime"
import { DocumentTitle } from "../dom/DocumentTitle"
import { supabaseQuery } from "../supabase/query"
import { fadedButtonClass } from "../ui/button"
import { maxWidthContainerClass } from "../ui/container"
import { leftButtonIconClass } from "../ui/icon"
import { textInputClass } from "../ui/input"
import { bucketQueryKey, getBucketDetails } from "./data"
import { DeleteBucketButton } from "./DeleteBucketButton"
import { RenameBucketButton } from "./RenameBucketButton"

export function BucketPage({ bucketId }: { bucketId: string }) {
  const bucketQuery = useQuery({
    queryKey: [bucketQueryKey, bucketId],
    queryFn: () => getBucketDetails(bucketId),
  })

  const columnListQuery = useQuery({
    queryKey: ["columns", bucketId],
    queryFn: () =>
      supabaseQuery("columns")
        .select(["id", "name", "bucketId"])
        .eq("bucketId", bucketId)
        .select(["id", "name"])
        .all(),
  })

  const client = useQueryClient()
  const createColumnMutation = useMutation(
    (data: { name: string; bucketId: string }) =>
      supabaseQuery("columns").insert(data).resolve(),
    {
      async onSuccess() {
        await client.invalidateQueries(["columns"])
      },
    },
  )

  const deleteColumnMutation = useMutation(
    (id: string) => supabaseQuery("columns").delete().eq("id", id).resolve(),
    {
      async onSuccess() {
        await client.invalidateQueries(["columns"])
      },
    },
  )

  const [, setLocation] = useLocation()

  const columnScrollContainerRef = React.useRef<HTMLDivElement>(null)

  if (bucketQuery.isLoading) {
    return <p>Loading...</p>
  }

  if (bucketQuery.error) {
    return <p>Error: {extractErrorMessage(bucketQuery.error)}</p>
  }

  if (!bucketQuery.data) {
    return <p>Bucket not found</p>
  }

  return (
    <DocumentTitle title={bucketQuery.data.name}>
      <div className="flex flex-col h-full">
        <section
          className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 ${maxWidthContainerClass}`}
        >
          <div className="mr-auto">
            <h1 className="text-2xl font-light">{bucketQuery.data.name}</h1>
            <p className="italic lowercase opacity-60">
              created on{" "}
              <DateTime
                date={bucketQuery.data.createdAt}
                dateStyle="long"
                timeStyle="short"
              />
            </p>
          </div>

          <div className="flex gap-4">
            <RenameBucketButton
              bucket={bucketQuery.data}
              className={fadedButtonClass}
            >
              <PencilAltIcon className={leftButtonIconClass} /> rename
            </RenameBucketButton>
            <DeleteBucketButton
              className={fadedButtonClass}
              bucket={bucketQuery.data}
              onSuccess={() => setLocation("/")}
            >
              <TrashIcon className={leftButtonIconClass} /> delete
            </DeleteBucketButton>
          </div>
        </section>

        <section
          className="grid grid-flow-col gap-4 p-4 auto-cols-[18rem] grid-rows-1 mx-auto min-w-[min(1024px,100%)] max-w-full overflow-x-auto flex-1 overflow-y-auto min-h-0"
          ref={columnScrollContainerRef}
        >
          {columnListQuery.data?.map((column) => (
            <div
              key={column.id}
              className="flex flex-col p-3 bg-gray-900 rounded-md shadow-inner"
            >
              <div className="flex items-start gap-2 mb-3">
                <h3 className="flex-1 text-lg font-light leading-tight">
                  {column.name}
                </h3>
                <Button
                  className={fadedButtonClass}
                  title="delete this column"
                  onClick={() => {
                    deleteColumnMutation.mutate(column.id)
                  }}
                >
                  <TrashIcon className="w-5" />
                </Button>
              </div>

              <div className="grid items-start content-start flex-1 min-h-0 gap-3 overflow-y-auto transform-gpu">
                <ThoughtCard />
                <ThoughtCard />
                <ThoughtCard />
              </div>
            </div>
          ))}

          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault()

                const nameField = event.currentTarget.elements.namedItem(
                  "name",
                ) as HTMLInputElement

                createColumnMutation
                  .mutateAsync({
                    name: nameField.value,
                    bucketId,
                  })
                  .then(() => {
                    requestIdleCallback(() => {
                      columnScrollContainerRef.current?.scrollBy({
                        left:
                          columnScrollContainerRef.current.clientWidth +
                          columnScrollContainerRef.current.scrollWidth,
                        behavior: "smooth",
                      })
                    })
                  })

                nameField.value = ""
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="add a new column..."
                className={textInputClass}
              />
              <Button type="submit" hidden />
            </form>
          </div>
        </section>
      </div>
    </DocumentTitle>
  )
}

function ThoughtCard() {
  return (
    <div className="p-2 bg-gray-800 border-l-4 border-blue-400 rounded-sm shadow">
      Anim voluptate minim cupidatat fugiat incididunt nulla adipisicing.
    </div>
  )
}
