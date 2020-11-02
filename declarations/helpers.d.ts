interface Dict<T> {[key: string]: T}

type SimpleSet = Dict<true>

type Resolved<T> = T extends PromiseLike<infer F> ? F : T
type ResolvedReturn<T> = T extends (...args: any[]) => PromiseLike<infer F> ? F
  : T extends (...args: any[]) => infer F ? F
    : T

interface Loadable<T> {
  data?: T
  loading?: true
  loadError?: Error
}

interface Saveable<T> {
  data?: T
  saving?: true
  saveError?: Error
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type nil = null|undefined

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/consistent-type-definitions
type EmptyObject = {}
