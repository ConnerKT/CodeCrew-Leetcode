import React from "react";
import { Grid, Paper, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';

// This is a container component just so we can keep our code clean
function AdminPanel({ children }) {
  return (
    <div>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#f0f0f0" }}>
            {children}
          </Paper>
        </Grid>     
    </div>
  );
}

export default AdminPanel;
