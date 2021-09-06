import React from "react"
import { useMutation } from "react-query"
import { extractErrorMessage } from "../common/helpers"
import { Button } from "../dom/Button"
import { supabase } from "../supabase/client"
import { solidButtonClass } from "../ui/button"
import { maxWidthContainerClass } from "../ui/container"

export function LoginForm() {
  const mutation = useMutation((variables: { email: string }) => {
    return supabase.auth.signIn({ email: variables.email })
  })

  if (mutation.isLoading) {
    return <p className={maxWidthContainerClass}>just one moment...</p>
  }

  if (mutation.isSuccess) {
    return (
      <p className={maxWidthContainerClass}>
        sent a magic login link to {mutation.variables?.email}!
      </p>
    )
  }

  return (
    <div className={maxWidthContainerClass}>
      <h1 className="text-3xl font-light">log in</h1>
      <p className="mt-2">a magic link to log in will be sent to your email!</p>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault()
          mutation.mutate({ email: event.currentTarget.email.value })
        }}
      >
        <label>
          <div className="text-sm font-semibold">email</div>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="px-3 py-2 leading-none transition-colors bg-black/50 focus:outline-none focus:bg-black/75"
          />{" "}
        </label>
        <Button
          type="submit"
          className={`${solidButtonClass} block mt-2`}
          disabled={mutation.isLoading}
        >
          sign in with email
        </Button>
        {mutation.error && <p>{extractErrorMessage(mutation.error)}</p>}
      </form>
    </div>
  )
}
