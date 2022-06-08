import React, { FC, Dispatch, SetStateAction, useRef } from 'react'
import styles from "./Input.module.css"
import { AddButton } from './AddButton';


const Input: FC<{list: string[], setList: Dispatch<SetStateAction<string[]>>}> = ({list, setList}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const addItem = () => {
        list.every(item => item !== inputRef.current.value) && inputRef.current.value !== null && setList([...list, inputRef.current.value]);
    }
  return (
    <div className={styles.inputWrapper}>
        <input type="text" ref={inputRef} className={styles.inputText}/>
        <AddButton addItem={addItem}/>
        {/* <button type='button' onClick={addItem}>追加</button> */}
    </div>
  )
}

export default Input
