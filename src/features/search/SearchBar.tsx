import { prevented }                                      from '@whitetrefoil/jsx-sp-events'
import type { ChangeEvent, FC, FormEvent }                from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import css                                                from './index.scss'


const SearchBar: FC<{
  onSearch: (val: string) => unknown
}> = ({
  onSearch,
}) => {

  const [value, setValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    inputRef.current?.scrollIntoView()
  }, [])

  const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.currentTarget.value)
  }, [])

  const onSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
    onSearch(value)
  }, [onSearch, value])

  const onReset = useCallback(() => {
    setValue('')
    inputRef.current?.focus()
  }, [])

  return (
    <form action="#" onSubmit={prevented(onSubmit)} onReset={onReset} className={css.searchBar}>
      <input ref={inputRef} type="text" className={css.text} value={value} onChange={onInputChange}/>
      <button type="reset" className={css.clear}/>
    </form>
  )
}


export default memo(SearchBar)
