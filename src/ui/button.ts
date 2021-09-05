import clsx from "clsx"
import { activePressClass } from "./effects"

export const solidButtonClass = clsx`
  px-3 py-2 rounded leading-none shadow transition font-semibold text-shadow
  text-white bg-green-600 hover:bg-green-700
  ${activePressClass}
`

export const clearButtonClass = clsx`
  p-3 -m-3 opacity-60 text-shadow
  hover:opacity-100
`
