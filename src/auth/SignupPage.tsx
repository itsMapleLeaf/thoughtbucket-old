import React from "react"
import { useMutation } from "react-query"
import { Link } from "wouter"
import { extractErrorMessage } from "../common/helpers"
import { Button } from "../dom/Button"
import { supabase } from "../supabase/client"
import { solidButtonClass } from "../ui/button"
import { smallMaxWidthContainerClass } from "../ui/container"
import { TextInputField } from "../ui/TextInputField"

export function SignupPage() {
  const signupMutation = useMutation(
    (variables: { email: string; password: string }) =>
      supabase.auth.signUp(variables),
  )

  return (
    <div className={smallMaxWidthContainerClass}>
      <h1 className="text-3xl font-light">sign up</h1>

      <form
        className="grid gap-3 mt-4 justify-items-start"
        onSubmit={(event) => {
          event.preventDefault()
          signupMutation.mutate({
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
          })
        }}
      >
        <TextInputField.Email name="email" required />
        <TextInputField.Password name="password" required isNewPassword />
        <Button type="submit" className={`${solidButtonClass} block mt-2`}>
          sign up
        </Button>
      </form>

      {signupMutation.error && (
        <p className="mt-4">{extractErrorMessage(signupMutation.error)}</p>
      )}
      <p className="mt-4">
        already signed up?{" "}
        <Link to="/login" className="underline opacity-100">
          log in
        </Link>
      </p>
    </div>
  )
}
