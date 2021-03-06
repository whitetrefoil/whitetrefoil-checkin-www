import { useRef }   from 'react'
import { generate } from 'shortid'


export const useEid = (): [
  (key: string) => string,
  (str: TemplateStringsArray) => string,
] => {
  const idStore = useRef<Record<string, string>>({})

  const eid = (key: string): string => {

    const currentKey = idStore.current[key]
    if (currentKey != null) {
      return currentKey
    }

    const newId = `eid${generate()}`
    idStore.current = {
      ...idStore.current,
      [key]: newId,
    }

    return newId
  }

  const i = (str: TemplateStringsArray): string => eid(str[0] ?? '')

  return [eid, i]
}


export const usePid = (): Record<string, string> => {
  const idStore = useRef<Record<string, string>>({})
  const pid = new Proxy(idStore.current, {
    get: (target, p) => {
      if (typeof p === 'string' && p in target) {
        return target[p]
      }
      const newId = `_${generate()}`
      target[String(p)] = newId
      return newId
    },
  })
  return pid
}
