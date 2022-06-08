import React, { FC, useState } from 'react'
import './App.css'
import BasicTabs from './components/BasicTabs'
import { todoList } from './const/todoList'
const Header = () => {
  return (
    <>
       
    </>
  )
}


const App: FC = () => {
  const [list, setList] = useState<string[]>([...todoList])
  const [rows, setRows] = useState([])

  return (
    <div className="App">
      <BasicTabs list={list} setList={setList} setRows={setRows} rows={rows}/>
    </div>
  )
}

export default App
