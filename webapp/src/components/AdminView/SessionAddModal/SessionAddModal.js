import React, { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SessionAddModal = ({ open, handleClose }) => {
  const [sessionName, setSessionName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const problemsSectionRef = useRef(null);

  const handleSessionSubmit = () => {
    if (sessionName.trim() !== '') {
      setStep(2); // Proceed to step 2 (problem selection)
      // Scroll to the problems section after a short delay
      setTimeout(() => {
        if (problemsSectionRef.current) {
          problemsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Adjust delay as needed for proper scrolling
    } else {
      console.error('Session name is required');
    }
  };

  const handleProblemSelect = (problem) => {
    // Toggle selection of the problem
    const isSelected = selectedProblems.includes(problem);
    const updatedProblems = isSelected
      ? selectedProblems.filter((p) => p !== problem)
      : [...selectedProblems, problem];
    setSelectedProblems(updatedProblems);
  };

  const handleSubmission = () => {
    if (selectedProblems.length === 3) {
      // Perform submission logic here (e.g., save selected problems)
      console.log('Selected problems:', selectedProblems);
      handleClose(); // Close the modal after submission
    } else {
      console.error('Please select all 3 problems');
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
            <div ref={problemsSectionRef} style={{ marginTop: '16px' }}>
              <Button
                onClick={() => handleProblemSelect('Problem 1')}
                variant={selectedProblems.includes('Problem 1') ? 'contained' : 'outlined'}
              >
                Problem 1
              </Button>
              <Button
                onClick={() => handleProblemSelect('Problem 2')}
                variant={selectedProblems.includes('Problem 2') ? 'contained' : 'outlined'}
              >
                Problem 2
              </Button>
              <Button
                onClick={() => handleProblemSelect('Problem 3')}
                variant={selectedProblems.includes('Problem 3') ? 'contained' : 'outlined'}
              >
                Problem 3
              </Button>
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
