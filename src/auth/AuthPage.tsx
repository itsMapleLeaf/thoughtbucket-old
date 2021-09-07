import React from "react"
import { useMutation } from "react-query"
import { extractErrorMessage } from "../common/helpers"
import { Button } from "../dom/Button"
import { supabase } from "../supabase/client"
import { maxWidthContainerClass } from "../ui/container"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export function AuthPage() {
  const [view, setView] = React.useState<"login" | "signup">("signup")

  const loginMutation = useMutation(
    (variables: { email: string; password: string }) =>
      supabase.auth.signIn(variables),
  )

  const signupMutation = useMutation(
    (variables: { email: string; password: string }) =>
      supabase.auth.signUp(variables),
  )

  if (loginMutation.isLoading || signupMutation.isLoading) {
    return <p className={maxWidthContainerClass}>just one moment...</p>
  }

  if (signupMutation.isSuccess) {
    return (
      <p className={maxWidthContainerClass}>
        a confirmation email was sent to{" "}
        {signupMutation.variables?.email ?? "your email"}!
      </p>
    )
  }

  return (
    <div className="w-full max-w-md px-4 mx-auto">
      {view === "login" && (
        <div className="p-4 bg-gray-900 rounded-md shadow-inner">
          <LoginForm onSubmit={(values) => loginMutation.mutate(values)} />
          {loginMutation.error && (
            <p className="mt-4">{extractErrorMessage(loginMutation.error)}</p>
          )}
          <p className="mt-4">
            {"don't have an account yet? "}
            <Button
              className="underline opacity-100"
              onClick={() => setView("signup")}
            >
              sign up
            </Button>
          </p>
        </div>
      )}
      {view === "signup" && (
        <div className="p-4 bg-gray-900 rounded-md shadow-inner">
          <SignupForm onSubmit={(values) => signupMutation.mutate(values)} />
          {signupMutation.error && (
            <p className="mt-4">{extractErrorMessage(signupMutation.error)}</p>
          )}
          <p className="mt-4">
            already signed up?{" "}
            <Button
              className="underline opacity-100"
              onClick={() => setView("login")}
            >
              log in
            </Button>
          </p>
        </div>
      )}
    </div>
  )
}
