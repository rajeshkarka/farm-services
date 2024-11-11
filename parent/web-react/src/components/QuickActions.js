// frontend/src/components/QuickActions.js
import React from 'react';
import { Button, Stack } from '@mui/material';

const QuickActions = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Button variant="contained" color="primary">Log Production</Button>
      <Button variant="contained" color="secondary">Add Feed Stock</Button>
      <Button variant="contained" color="warning">Log Expense</Button>
      <Button variant="contained" color="success">Record Sale</Button>
    </Stack>
  );
};

export default QuickActions;
