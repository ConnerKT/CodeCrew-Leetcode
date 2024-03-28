import React from "react";
import { ListItem, ListItemText } from "@mui/material";

function ProblemListItem({ title }) {
  return (
    <ListItem>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default ProblemListItem;