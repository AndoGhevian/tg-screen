import { useEffect, useMemo, useState } from "react"
import { randomPhrase } from "../randomPhrase"

export const useRandomPhrase = ({
  generateInteval = 2000,
}: {
  generateInteval?: number
} = {} as any) => {
  const initPhrase = useMemo(() => randomPhrase(), [])
  const [phrase, setPhrase] = useState(initPhrase)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(randomPhrase())
    }, generateInteval)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return phrase
}
