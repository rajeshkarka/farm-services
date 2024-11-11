// frontend/src/components/RecentActivity.js
import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const activities = [
  { id: 1, text: 'Added 500 kg of feed to stock' },
  { id: 2, text: 'Recorded sales of 300 eggs' },
  { id: 3, text: 'Logged expense for maintenance' },
];

const RecentActivity = () => {
  return (
    <List>
      {activities.map((activity) => (
        <React.Fragment key={activity.id}>
          <ListItem>
            <ListItemText primary={activity.text} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentActivity;
