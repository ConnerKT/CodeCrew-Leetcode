import "./Content.css";
import { useLogin } from "../../../contexts/LoginContext";
import { Button } from "@mui/material";

import CodingChallengesView from "./CodingChallengesView";
function MainContent() {
    const { logout, gameRoom } = useLogin();

    let users = gameRoom.roomData.users;
    console.log(users);
    return <>
                
                <Button variant="contained" onClick={logout}>Leave</Button>

                <div>
                    <h1>Users</h1>
                    <ul>
                        {users.map((user) => <li key={user.id}>{user}</li>)}
                    </ul>
                </div>

                <CodingChallengesView/> 
            
            </> 
  
}

export default MainContent;