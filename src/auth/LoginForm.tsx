import React from "react"
import { Button } from "../dom/Button"
import { solidButtonClass } from "../ui/button"
import { TextInputField } from "../ui/TextInputField"

export function LoginForm({
  onSubmit,
}: {
  onSubmit: (values: { email: string; password: string }) => void
}) {
  return (
    <div>
      <h1 className="text-3xl font-light">log in</h1>
      <form
        className="grid gap-3 mt-4 justify-items-start"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit({
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
    </div>
  )
}
