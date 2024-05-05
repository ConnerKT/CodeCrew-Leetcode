import ChallengeDetailsView from "./ChallengeDetailsView";
import { useEffect, useState } from "react";
import "./Content.css";
import ChallengeOptions from "./ChallengeOptions";
import { useLogin } from "../../../contexts/LoginContext";
import { Button } from "@mui/material";
import axios from "axios";
import {
    useQuery
  } from '@tanstack/react-query'
  
import CircularProgress from "@mui/material/CircularProgress";
function MainContent() {
    const { isLoggedIn, user, gameRoom, login, logout } = useLogin();
    const [focusedChallengeIndex, setFocusedChallengeIndex] = useState(null);
    const { isPending, error,  data: challenges, status } = useQuery({
        queryKey: ['challenges', gameRoom.roomData.problems],
        queryFn: async () => {
            let response = await  axios.post(`${process.env.REACT_APP_API_URL}/problemsbyid`, { ids: gameRoom.roomData.problems }, { withCredentials: true })
            setFocusedChallengeIndex(0)
            return response.data;
        }
    });

    return <>
            <h1>Current user: {user.username}</h1>
            {/* <h1>gameRoom: {gameRoom.gameroomId}</h1> */}
           { isPending ? 
          <div className="loadingContainer">
            <div className="spinnerWrapper">
              <CircularProgress size="100px" />
            </div>
          </div> : <>
            <Button variant="contained" onClick={()=>{logout()}}>Logout</Button>
            <ChallengeOptions challenges={challenges} focusedChallengeIndex={focusedChallengeIndex} setFocusedChallengeIndex={setFocusedChallengeIndex}/>
            <ChallengeDetailsView challenge={challenges[focusedChallengeIndex]} /> 
            </>
        }
        </> 
  
}

export default MainContent;