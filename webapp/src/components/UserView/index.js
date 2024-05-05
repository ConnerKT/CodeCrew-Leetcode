import { useEffect, useState } from "react";
import { useLogin } from "../../contexts/LoginContext";
import { Button } from "@mui/material";
import LoginForm from "./LoginForm";
import MainContent from "./MainContent";
import { CircularProgress } from "@mui/material";

function UserView() {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn === null) {
    return <div className="loadingContainer">
            <div className="spinnerWrapper">
              <CircularProgress size="100px" />
            </div>
          </div> 
  }

  return <div id="content">
          {isLoggedIn != true ? <LoginForm/> : <MainContent/>}
        </div>
  
}

export default UserView;
