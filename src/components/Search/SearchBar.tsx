import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import React, { ChangeEvent, FC, FormEvent, memo }  from 'react';
import * as css                                     from './index.scss';


const SearchBar: FC<{
  current: string;
  onChange(val: string): unknown;
}> = ({
  current,
  onChange,
}) => {

  const [input, setInput] = useState(current);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
    onChange(input);
  }, [input, onChange]);

  const onReset = useCallback(() => {
    setInput('');
    inputRef.current?.focus();
  }, []);

  const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setInput(ev.currentTarget.value);
  }, []);

  return (
    <form action="#" onSubmit={onSubmit} onReset={onReset} className={css.searchBar}>
      <input ref={inputRef} type="text" className={css.text} value={input} onChange={onInputChange}/>
      <button type="reset" className={css.clear}>✘</button>
    </form>
  );
};


export default memo(SearchBar);
