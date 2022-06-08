// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, {FC, ReactNode} from 'react';

interface dateProviderProps {
    children?: ReactNode;
}

const dateProvider: FC<dateProviderProps> = ( props ) => {
    const {children} = props
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
}

export default dateProvider