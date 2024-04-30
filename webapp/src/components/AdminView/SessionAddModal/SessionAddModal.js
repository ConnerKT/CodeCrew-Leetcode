import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
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
  maxHeight: "80vh", 
  overflowY: "auto", 
};

const SessionAddModal = ({ open, handleClose, allItems }) => {
  const [sessionName, setSessionName] = useState("");
  const [step, setStep] = useState(1);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const problemsSectionRef = useRef(null);

  const handleSessionSubmit = () => {
    if (sessionName.trim() !== "") {
      setStep(2); 

      setTimeout(() => {
        if (problemsSectionRef.current) {
          problemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 
    } else {
      console.error("Session name is required");
    }
  };

  const postSession = async (session, problemsList) => {
    try {
      console.log(process.env.REACT_APP_GAMEROOM_API_URL, "URL GO BRRRRRRR")
  
      const response = await axios.post(process.env.REACT_APP_GAMEROOM_API_URL, {
        gameroomId: session,
        problems: problemsList
      
      });
      
      console.log(response);
  
      return response.data;
    } catch (error) {
   
      if (error.response) {
        
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
     
        console.error('No response received from server:', error.request);
      } else {
       
        console.error('Error setting up request:', error.message);
      }
  
      throw new Error('Failed to post problem:', error);
    }
  };

  const handleProblemSelect = async (problemId) => {
    if (selectedProblems.includes(problemId)) {

      setSelectedProblems(selectedProblems.filter((id) => id !== problemId));
    } else if (selectedProblems.length < 3) {

      setSelectedProblems([...selectedProblems, problemId]);
    }
    
   
  };
  const handleModalClose = () => {
    // Reset modal state when closing after successful submission
    setSessionName(""); // Reset session name
    setStep(1); // Reset step to initial state
    setSelectedProblems([]); // Reset selected problems
    handleClose(); // Close the modal
  };

  const handleSubmission = async () => {
    if (selectedProblems.length === 3) {

      const selectedProblemNames = selectedProblems.map((_id) => {
        const problem = allItems.find((item) => item._id === _id);
        return problem ? problem._id : "";
      });
      console.log("Selected problems:", selectedProblemNames);
      handleClose(); 
    } else {
      console.error("Please select exactly 3 problems");
    }
    try {
      const response = await postSession(sessionName ,selectedProblems)
      console.log(response);
      
  }catch(err){
      console.log(err);
  }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {step === 1 && (
          <>
            <Typography variant="h5" component="h2">
              Please Enter a Session Name:
            </Typography>
            <Divider />
            <Typography sx={{ mt: 2 }}>
              <TextField
                label="Session Name"
                color="primary"
                focused
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />
              <Button
                onClick={handleSessionSubmit}
                sx={{ mt: 2 }}
                variant="contained"
                disabled={!sessionName.trim()}
              >
                Next
              </Button>
            </Typography>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h5" component="h2">
              Choose Problems:
            </Typography>
            <Divider />
            <div
              ref={problemsSectionRef}
              style={{
                marginTop: "16px",
                maxHeight: "calc(80vh - 200px)",
                overflowY: "auto",
              }}
            >
              {allItems.map((item) => (
                <Button
                  key={item._id}
                  onClick={() => handleProblemSelect(item._id)}
                  variant={
                    selectedProblems.includes(item._id)
                      ? "contained"
                      : "outlined"
                  }
                  disabled={
                    selectedProblems.length === 3 &&
                    !selectedProblems.includes(item._id)
                  }
                  style={{ margin: "8px" }}
                >
                  {item.title}
                </Button>
              ))}
            </div>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {`${selectedProblems.length} problems selected out of 3`}
            </Typography>
            <Button
              onClick={handleSubmission}
              sx={{ mt: 2 }}
              variant="contained"
              disabled={selectedProblems.length !== 3}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SessionAddModal;
