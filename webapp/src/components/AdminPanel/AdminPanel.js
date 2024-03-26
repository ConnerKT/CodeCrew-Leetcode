import React from "react";
import { Grid, Paper, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';

const handleEmailClick = () => {
    // Handle click on email
  };

  const handlePhoneClick = () => {
    // Handle click on phone
  };


function AdminPanel() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper style={{ height: 100, backgroundColor: "#f0f0f0" }}>
          <List>
            <ListItem>
              <ListItemIcon onClick={handleEmailClick}>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" />
            </ListItem>
            <ListItem>
              <ListItemIcon onClick={handlePhoneClick}>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Phone" />
            </ListItem>
          </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ height: 100, backgroundColor: "#f0f0f0" }}>
          <List>
            <ListItem>
              <ListItemIcon onClick={handleEmailClick}>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" />
            </ListItem>
            <ListItem>
              <ListItemIcon onClick={handlePhoneClick}>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Phone" />
            </ListItem>
          </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPanel;
