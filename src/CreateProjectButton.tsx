import type { User } from "@supabase/supabase-js"
import React from "react"
import { useMutation } from "react-query"
import { v4 } from "uuid"
import { extractErrorMessage } from "./helpers"
import { supabaseTable } from "./supabase"

export function CreateProjectButton({
  user,
  onSuccess,
}: {
  user: User
  onSuccess: () => void
}) {
  const mutation = useMutation(
    async (name: string) => {
      await supabaseTable("projects").insert({
        id: v4(),
        name,
        owner_id: user.id,
      })
    },
    {
      onSuccess,
    },
  )

  return (
    <>
      <button
        style={
          mutation.isLoading ? { opacity: 0.5, pointerEvents: "none" } : {}
        }
        onClick={() => {
          if (mutation.isLoading) return

          const name = window.prompt("Project name?")
          if (name) mutation.mutate(name)
        }}
      >
        create project
      </button>
      {mutation.isError && <p>{extractErrorMessage(mutation.error)}</p>}
    </>
  )
}
