import React from "react"
import { useMutation } from "react-query"
import { extractErrorMessage } from "../common/helpers"
import { supabase } from "../supabase/client"

export function LoginForm() {
  const mutation = useMutation((variables: { email: string }) => {
    return supabase.auth.signIn({ email: variables.email })
  })

  if (mutation.isLoading) {
    return <div>just one moment...</div>
  }

  if (mutation.isSuccess) {
    return <p>sent a magic login link to {mutation.variables?.email}!</p>
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        mutation.mutate({ email: event.currentTarget.email.value })
      }}
    >
      <input name="email" type="email" />
      <button type="submit">sign in with email</button>
      {mutation.error && <p>{extractErrorMessage(mutation.error)}</p>}
    </form>
  )
}
