import { Box, TextField } from '@mui/material';
import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import BasicDateTimePicker from './BasicDateTimePicker';
import CustomizedMenus from './Menu';


const LayoutTextFields: ({ rows, setRows, setValue }: {
  rows: object[];
  setRows: Dispatch<SetStateAction<object[]>>;
  setValue: any;
}) => JSX.Element = ({ rows, setRows, setValue }) => {
    const date = new Date();
    const [ampm, setAmpm] = useState("am");
    const [createAt, setCreateAt] = useState("")
    const inputRefTask = useRef<MutableRefObject<string>>()
    const inputRefCreateAt = useRef<MutableRefObject<Date>>()
    const inputRefDeadline = useRef<MutableRefObject<Date>>()
    
    useEffect(() => {
      setAmpm("pm");
    }, [])

    const getToDeadline = (inputRefCreateAt, inputRefDeadline) => {
      const createYear: number = inputRefCreateAt.current.value.substr(6, 4)
      const createMonth: number = inputRefCreateAt.current.value.substr(0, 2)
      const createDay: number = inputRefCreateAt.current.value.substr(3, 2)

      const deadlineYear: number = inputRefDeadline.current.value.substr(6, 4)
      const deadlineMonth: number = inputRefDeadline.current.value.substr(0, 2)
      const deadlineDay: number = inputRefDeadline.current.value.substr(3, 2)

      const result = [];
      if (deadlineYear - createYear > 0) {
        result.push("1年以上")
      } else if (deadlineMonth - createMonth > 0) {
        result.push(`${deadlineMonth - createMonth}ヶ月`)
      } else if (deadlineDay - createDay > 0) {
        const toDeadline = deadlineDay - createDay
        toDeadline > 21 ? result.push("3週間") :
        toDeadline > 14 ? result.push("2週間") : 
        toDeadline > 7 ? result.push("1週間") : 
        result.push(`${toDeadline}日`);
      } else {        
        result.push(`${deadlineDay - createDay}日`)
      }
      return result;
    }
    const inputValues = (inputRefTask, inputRefCreateAt, inputRefDeadline) => {
      setRows(
        [...rows, 
          {
        id: rows.length + 1,
        task: inputRefTask.current.value,
        createAt: inputRefCreateAt.current.value,
        deadline: inputRefDeadline.current.value,
        toDeadline: getToDeadline(inputRefCreateAt, inputRefDeadline),
        progress: null
        }
      ]);
      setTimeout(setValue(2), 1500)
    }


    const getCreateAtDate = (date: Date) => {
      const y: number = date.getFullYear();
      const m: number | string = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const d: number | string = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const hh: any = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const mm: number | string = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      
      if (date.getHours() > 12) {
        return `${m}/${d}/${y} ${hh - 12}:${mm} ${ampm}`
      } else {
        return `${m}/${d}/${y} ${hh}:${mm} ${ampm}`
      }
    }
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { width: '40ch' },
      }}
    >
      <TextField label={'Task'}  margin='normal' inputRef={inputRefTask}/>
      
      <TextField label={'Create At'}  margin="normal" value={createAt} onFocus={() => setCreateAt(getCreateAtDate(date))} inputRef={inputRefCreateAt}/>
      
      <BasicDateTimePicker inputRefDeadline={inputRefDeadline}/>

      <CustomizedMenus />
      <button type='button' onClick={() => inputValues(inputRefTask, inputRefCreateAt, inputRefDeadline)}>追加</button>
    </Box>
  );
}


const DataInput = ({rows, setRows, setValue}) => {
  return (
    <>
        <LayoutTextFields rows={rows} setRows={setRows} setValue={setValue}/>
    </>
  )
}

export default DataInput