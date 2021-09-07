import { TrashIcon } from "@heroicons/react/solid"
import React from "react"
import { MutationButton } from "../state/MutationButton"
import { supabaseQuery } from "../supabase/query"
import { fadedButtonClass } from "../ui/button"
import { columnQueryKey } from "./data"

export function ColumnHeader({
  column,
}: {
  column: { id: string; name: string }
}) {
  return (
    <div className="flex items-start gap-2">
      <h3 className="mr-auto text-lg font-light leading-tight">
        {column.name}
      </h3>
      <MutationButton
        title="delete this column"
        className={fadedButtonClass}
        mutateFn={() =>
          supabaseQuery("columns").delete().eq("id", column.id).resolve()
        }
        getVariables={() => ({})}
        onSuccess={({ client }) => {
          client.invalidateQueries(columnQueryKey)
        }}
      >
        <TrashIcon className="w-5" />
      </MutationButton>
    </div>
  )
}
