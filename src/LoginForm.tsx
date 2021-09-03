import React, { FormEvent } from "react"
import { supabase } from "./supabase"

export function LoginForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = event.currentTarget.elements.namedItem(
      "email",
    ) as HTMLInputElement

    supabase.auth
      .signIn({ email: email.value })
      .then(() => {
        window.alert(`sent a magic login link to ${email.value}!`)
      })
      .catch((error) => {
        console.warn(error)
        window.alert(`oops, something went wrong, try again`)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <button type="submit">sign in with email</button>
    </form>
  )
}
