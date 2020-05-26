import { useCallback, useState }                   from 'preact/hooks';
import React, { ChangeEvent, FC, FormEvent, memo } from 'react';
import * as css                                    from './index.scss';


const SearchBar: FC<{
  current: string;
  onChange(val: string): unknown;
}> = ({
  current,
  onChange,
}) => {

  const [input, setInput] = useState(current);

  const onSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
    onChange(input);
  }, [input, onChange]);

  const onReset = useCallback(() => setInput(''), []);

  const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setInput(ev.currentTarget.value);
  }, []);

  return (
    <form action="#" onSubmit={onSubmit} onReset={onReset} className={css.root}>
      <input type="text" className={css.text} value={input} onChange={onInputChange}/>
      <button type="reset" className={css.clear}/>
    </form>
  );
};


export default memo(SearchBar);
