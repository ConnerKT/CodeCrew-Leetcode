import Paper from "@mui/material/Paper";
import "./ChallengeDetailsView.css"
import { useLogin } from "../../../contexts/LoginContext";
function ChallengeDetailsView({challenge}){
    const { isLoggedIn, user, gameRoom, login, logout } = useLogin();


    return <Paper id="challengeDetailsContainer">

            </Paper>
}

export default ChallengeDetailsView