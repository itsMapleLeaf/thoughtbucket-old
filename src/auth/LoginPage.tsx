import React from "react"
import { useMutation } from "react-query"
import { Link } from "wouter"
import { extractErrorMessage } from "../common/helpers"
import { Button } from "../dom/Button"
import { supabase } from "../supabase/client"
import { solidButtonClass } from "../ui/button"
import { smallMaxWidthContainerClass } from "../ui/container"
import { TextInputField } from "../ui/TextInputField"

export function LoginPage() {
  const loginMutation = useMutation(
    (variables: { email: string; password: string }) =>
      supabase.auth.signIn(variables),
  )

  return (
    <div className={smallMaxWidthContainerClass}>
      <h1 className="text-3xl font-light">log in</h1>

      <form
        className="grid gap-3 mt-4 justify-items-start"
        onSubmit={(event) => {
          event.preventDefault()
          loginMutation.mutate({
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
          })
        }}
      >
        <TextInputField.Email name="email" required />
        <TextInputField.Password name="password" required isNewPassword />

        <Button type="submit" className={`${solidButtonClass} block mt-2`}>
          log in
        </Button>
      </form>

      {loginMutation.error && (
        <p className="mt-4">{extractErrorMessage(loginMutation.error)}</p>
      )}

      <p className="mt-4">
        {"don't have an account yet? "}
        <Link to="/signup" className="underline opacity-100">
          sign up
        </Link>
      </p>
    </div>
  )
}
