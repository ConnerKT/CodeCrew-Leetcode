import { React, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

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

function AddModal(props) {
  const [difficulty, setDifficulty] = useState("");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Leetcode Problem
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Problem Name"
              defaultValue="Two Sum"
            />
            <Box sx={{ minWidth: 120, mt: 2 }}>
              <FormControl sx={{ minWidth: 224 }}>
                <InputLabel id="demo-simple-select-label">
                  Difficulty
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficulty}
                  label="Difficulty"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Easy</MenuItem>
                  <MenuItem value={20}>Medium</MenuItem>
                  <MenuItem value={30}>Hard</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              required
              id="outlined-required"
              label="Problem Description"
              defaultValue="Given an array of integers nums and"
              sx={{ mt: 2 }}
            />
          </Typography>
          <Button sx={{ mt: 2 }} variant="contained" endIcon={<SendIcon />}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
