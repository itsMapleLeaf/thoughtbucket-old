import type { User } from "@supabase/supabase-js"
import React from "react"
import { useQuery } from "react-query"
import { CreateProjectButton } from "./CreateProjectButton"
import { ProjectSummary } from "./ProjectSummary"
import { supabase, supabaseSelect, supabaseTable } from "./supabase"

export function Home({ user }: { user: User }) {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const result = await supabaseSelect(supabaseTable("projects"), [
        "id",
        "name",
      ])
      return result.data
    },
  })

  return (
    <main>
      <p>user id: {user.id}</p>

      <CreateProjectButton user={user} onSuccess={() => query.refetch()} />

      <button type="button" onClick={() => supabase.auth.signOut()}>
        log out
      </button>

      {query.isLoading && <p>loading...</p>}
      <ul>
        {query.data?.map((project) => (
          <li key={project.id}>
            <ProjectSummary
              project={project}
              onDeleteSuccess={() => query.refetch()}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
