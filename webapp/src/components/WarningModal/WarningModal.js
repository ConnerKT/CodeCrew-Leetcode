import { React, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import axios from "axios";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function WarningModal({ open, handleClose, itemToRemove, setItemsToAdd}) {

  const handleRemoveItem = async () => {
    try {
      const response = await axios.delete(
        `https://codecrew-leetcode-api.onrender.com/problems/${itemToRemove._id}`,
       
      );
      // const updatedProblems = response.data.allProblems;
      console.log(response);
    // if (setItemsToAdd) {
    //   setItemsToAdd(updatedProblems);
    // }
    handleClose();
    } catch (error) {
      console.error('Failed to delete problem:', error)
      throw new Error('Failed to delete problem:', error);
    }
};
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'red'}}>
          Warning
        </Typography>
        <p id="modal-modal-description">Are you sure you want to delete this item?</p>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="success" onClick={handleClose}>
            Go Back 🔙
          </Button>
          <Button onClick={handleRemoveItem}variant="outlined" color="error">
            Yes ✅
          </Button>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  );
}

export default WarningModal;
