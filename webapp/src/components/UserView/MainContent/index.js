import "./Content.css";
import { useLogin } from "../../../contexts/LoginContext";
import { Button } from "@mui/material";

import CodingChallengesView from "./CodingChallengesView";
function MainContent() {
    const { logout } = useLogin();

    return <>

                <Button variant="contained" onClick={logout}>Logout</Button>
                <CodingChallengesView/> 
            
            </> 
  
}

export default MainContent;