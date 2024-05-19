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

function EditModal(props) {
  const [problemName, setProblemName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");

const handleProblemNameChange = (event) => {
    setProblemName(event.target.value); 
};
const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
};

const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
};

const handleSubmit = async () => {

  console.log("Problem Name:", problemName);
  console.log("Difficulty:", difficulty);
  console.log("Description:", description);

  try {

    const response = await editProblemInServer(problemName, difficulty, description);
    props.setItemsToAdd(response.data.allProblems);
    console.log(response.data, "this data")
    props.handleClose(); 
  } catch (error) {
    console.error('Error posting problem:', error);

  }
};
const editProblemInServer = async (name, difficulty, description) => {
  try {
    const response = await axios.put(
      `https://codecrew-leetcode-api.onrender.com/api/problems/${props.currentItem._id}`,
      {
        title: name,
        difficulty,
        description
      }
    );
    
    (response);

    return response;
  } catch (error) {
    throw new Error('Failed to post problem:', error);
  }
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
            Edit Problem
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Problem Name"
              defaultValue={props.currentItem.title}
              onChange={handleProblemNameChange}
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
                  defaultValue={props.currentItem.difficulty}
                  label={props.currentItem.difficulty}
                  onChange={handleDifficultyChange}
                >
                  <MenuItem value={'Easy'}>Easy</MenuItem>
                  <MenuItem value={'Medium'}>Medium</MenuItem>
                  <MenuItem value={'Hard'}>Hard</MenuItem>
                </Select>
              </FormControl>
            </Box>
           
            <TextField
              required
              minRows={2} 
              maxRows={10}
              aria-label="minimum height"
              style={{ width: "100%", resize: "vertical", marginTop: 8 }}
              placeholder="Enter problem description..."
              value={description}
              defaultValue={props.currentItem.description}
              onChange={handleDescriptionChange}
            />
          </Typography>
          <Button onClick={handleSubmit} sx={{ mt: 2 }} variant="contained" endIcon={<SendIcon />}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
