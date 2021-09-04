import clsx from "clsx"

export const solidButtonClass = clsx`
  px-3 py-2 rounded leading-none shadow transition font-semibold text-white bg-green-600 text-shadow
  hover:bg-green-700
  active:bg-green-600 active:translate-y-[2px] active:transition-none active:shadow-none
`

export const clearButtonClass = clsx`
  p-3 -m-3 opacity-60 text-shadow
  hover:opacity-100
`
