import "./Content.css";
import { useLogin } from "../../../contexts/LoginContext";
import { Button, Grid, Avatar, Typography, Box, Tooltip, unstable_composeClasses } from "@mui/material";

import CodingChallengesView from "./CodingChallengesView";

function MainContent() {
    const { logout, gameRoom, user: thisUser } = useLogin();
    
    let users = gameRoom.roomData.users;

    return (
        <>
            <Box id="MainContentHeader" sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, position: "relative"}}>
                <Box>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {users.map((user) => {
                            let avatarUrl = `https://ui-avatars.com/api/?name=${user.username}&background=random&rounded=true&size=128`;
                            return (
                                <Tooltip title={user.username} key={user.id}>
                                    <Avatar src={avatarUrl} alt="avatar" sx={{ m: 2, border: thisUser.username == user.username ? "6px solid white": ""}} />
                                </Tooltip>
                            );
                        })}
                    </Box>
                </Box>
                <Button sx={{position: "absolute", right: "3%", top: "3%"}} variant="contained" color="primary" onClick={logout}>
                    Leave
                </Button>
            </Box>

            <CodingChallengesView />
        </>
    );
}

export default MainContent;
