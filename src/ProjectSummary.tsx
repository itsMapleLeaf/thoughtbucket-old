import React from "react"
import { useMutation } from "react-query"
import { supabaseTable } from "./supabase"

export function ProjectSummary({
  project,
  onDeleteSuccess,
}: {
  project: { id: string; name: string }
  onDeleteSuccess: () => void
}) {
  const deleteMutation = useMutation(
    async () => {
      await supabaseTable("projects").delete().eq("id", project.id)
    },
    {
      onSuccess: onDeleteSuccess,
    },
  )

  return (
    <p>
      <span>{project.name}</span>
      <button
        onClick={() => deleteMutation.mutate()}
        style={
          deleteMutation.isLoading
            ? { opacity: 0.5, pointerEvents: "none" }
            : {}
        }
      >
        delete
      </button>
    </p>
  )
}
