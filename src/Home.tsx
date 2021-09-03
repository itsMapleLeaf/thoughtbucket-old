import type { User } from "@supabase/supabase-js"
import React, { useEffect, useState } from "react"
import { v4 } from "uuid"
import { supabase } from "./supabase"

export function Home({ user }: { user: User }) {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from("projects")
      .select("id, name")
      .then((result) => {
        if (result.error) {
          console.error(result.error)
        } else {
          setProjects(result.data ?? [])
        }
      })
  }, [])

  const createProject = async () => {
    const name = window.prompt("Project name?")

    const result = await supabase
      .from("projects")
      .insert([{ id: v4(), name, owner_id: user.id }])
      .select("id, name")
      .single()

    if (result.error) {
      window.alert(`couldn't create project, try again`)
      console.error(result.error)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      setProjects((projects) => [...projects, result.data])
    }
  }

  return (
    <main>
      <p>user id: {user.id}</p>
      <button onClick={createProject}>create project</button>
      <button type="button" onClick={() => supabase.auth.signOut()}>
        log out
      </button>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </main>
  )
}
