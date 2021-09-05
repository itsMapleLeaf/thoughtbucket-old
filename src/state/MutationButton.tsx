import React from "react"
import type { QueryClient } from "react-query"
import { useMutation, useQueryClient } from "react-query"
import type { ButtonProps } from "../dom/Button"
import { Button } from "../dom/Button"

export function MutationButton<Data, Variables>({
  getVariables,
  mutateFn,
  onSuccess,
  onMutationError,
  ...props
}: ButtonProps & {
  getVariables: () => Variables | undefined
  mutateFn: (variables: Variables) => Promise<Data>
  onSuccess?: (context: {
    data: Data
    variables: Variables
    client: QueryClient
  }) => void
  onMutationError?: (error: unknown) => void
}) {
  const client = useQueryClient()

  const mutation = useMutation(mutateFn, {
    onSuccess(data, variables) {
      onSuccess?.({ data, variables, client })
    },
    onError(error) {
      alert(`something went wrong :( try again`)
      onMutationError?.(error)
    },
  })

  return (
    <Button
      {...props}
      onClick={() => {
        const variables = getVariables()
        if (variables) {
          mutation.mutate(variables)
        }
      }}
      disabled={mutation.status === "loading"}
    />
  )
}
