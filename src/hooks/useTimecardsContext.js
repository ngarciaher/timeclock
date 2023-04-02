import { TimecardsContext } from "../context/TimecardsContext"
import { useContext } from "react"

export const useTimecardsContext = () => {
  const context = useContext(TimecardsContext)

  if(!context) {
    throw Error('useTimecardsContext must be used inside an TimecardsContextProvider')
  }

  return context
}