import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import Input from './Input'
import List from './List'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ControlledSelectionGrid } from './DataList';
import DataInput from './DataInput';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  list: string[];
  setList: Dispatch<SetStateAction<string[]>>;
  rows: object[];
  setRows: Dispatch<SetStateAction<object[]>>;
}

const TabPanel: (props: TabPanelProps) => JSX.Element = (props) => {
  const { children, value, setValue, index, list, setList, rows, setRows, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          {
              value === 0 ? <List list={list}/> :
              value === 1 ? <Input list={list} setList={setList}/> :
              value === 2 ?  <ControlledSelectionGrid rows={rows} setRows={setRows}/>:
              <DataInput rows={rows} setRows={setRows} setValue={setValue}/>
          }
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs: ({ list, setList, rows, setRows }: {
  list: string[];
  setList: Dispatch<SetStateAction<string[]>>;
  rows: object[];
  setRows: Dispatch<SetStateAction<object[]>>;
}) => JSX.Element = ({list, setList, rows, setRows}) => {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
      setValue(0);
  }, [list])
  
  const outPutDatas: ({ setRows }: { setRows: Dispatch<SetStateAction<object[]>>; }) => void = ({setRows}) => {
    const url = "src/components/data.json";
    //json読み込み
    fetch(url)
    .then((res) => {
        return res.text();
    })
    .then((text) => {
        setRows(JSON.parse(text));
    });
    console.log("data listを表示しました")
  }
    useEffect(() => {
        outPutDatas({setRows})
    }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="List" {...a11yProps(0)} />
          <Tab label="Input" {...a11yProps(1)} />
          <Tab label="Data List" {...a11yProps(2)} />
          <Tab label="Data Input" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} setValue={setValue} index={0} list={list} setList={setList} rows={rows} setRows={setRows} />
      <TabPanel value={value} setValue={setValue} index={1} list={list} setList={setList} rows={rows} setRows={setRows} />
      <TabPanel value={value} setValue={setValue} index={2} list={list} setList={setList} rows={rows} setRows={setRows} />
      <TabPanel value={value} setValue={setValue} index={3} list={list} setList={setList} rows={rows} setRows={setRows} />
    </Box>
  );
}


export default BasicTabs;