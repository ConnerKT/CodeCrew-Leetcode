// LoginContext.js
import React, { createContext, useContext, useState } from 'react';
const { io } = require("socket.io-client");

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [gameRoom, setGameRoom] = useState(null);
    if(isLoggedIn != true){
        
    let socket = io("http://localhost:3001", {
        withCredentials: true
      });
      socket.on("connect_error", (err) => {
        console.error(err.message);
      });
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        // You can emit an event here if needed
  
      });
  
      socket.on("session_data", (session) => {
        console.log("Session Data:", session);
        setUser({ username: session.username });
        setGameRoom({ gameroomId: session.gameroomId });
        setIsLoggedIn(true);

      });
    }
    

    const login = (username, gameroomId) => {
        // Perform login logic, update state
        // For example:

        fetch("http://localhost:3001/login",{
                                                method: "POST",
                                                credentials: "include",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({ username, gameroomId }),
                                            })
        .then((res) => {
            setIsLoggedIn(true);
            setUser({ username });
            setGameRoom({ gameroomId });
        });

        // You can also handle the Socket.IO connection here or in a useEffect within this provider
    };

    const logout = () => {
        // Perform logout logic, clear state
        setIsLoggedIn(false);
        setUser(null);
        setGameRoom(null);
        // Disconnect from Socket.IO if needed
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, user, gameRoom, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
