import React from 'react'

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const AddButton = ({addItem}) => {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="secondary" aria-label="add" onClick={addItem}>
        <AddIcon />
      </Fab>
    </Box>
  );
}