import { PlusIcon } from "@heroicons/react/solid"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Button } from "../dom/Button"
import { supabaseQuery } from "../supabase/query"
import { fadedButtonClass } from "../ui/button"
import { inlineIconClass } from "../ui/icon"
import { textInputClass } from "../ui/input"
import { columnQueryKey } from "./data"

export function NewColumnForm({
  bucketId,
  onSuccess,
}: {
  bucketId: string
  onSuccess: () => void
}) {
  const [name, setName] = useState("")

  const client = useQueryClient()
  const createColumnMutation = useMutation(
    () => supabaseQuery("columns").insert({ name, bucketId }).resolve(),
    {
      async onSuccess() {
        await client.invalidateQueries(columnQueryKey)
        onSuccess()
      },
    },
  )

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        createColumnMutation.mutate()
        setName("")
      }}
    >
      <input
        aria-label="column name"
        placeholder="add a new column..."
        required
        className={textInputClass}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit" title="add column" className={fadedButtonClass}>
        <PlusIcon className={inlineIconClass} />
      </Button>
    </form>
  )
}
