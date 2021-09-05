import type { ReactNode } from "react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type TitleContext = {
  setParentTitle: (title: string) => void
}

const Context = createContext<TitleContext | undefined>(undefined)

export function DocumentTitle(props: { title: string; children: ReactNode }) {
  const [childTitle, setChildTitle] = useState<string>()
  const parentContext = useContext(Context)
  const title = [childTitle, props.title].filter(Boolean).join(" | ")

  useEffect(() => {
    if (parentContext) {
      parentContext.setParentTitle(title)
    } else {
      document.title = title
    }
  }, [parentContext, title])

  const context = useMemo(() => {
    return { setParentTitle: setChildTitle }
  }, [])

  return <Context.Provider value={context}>{props.children}</Context.Provider>
}
