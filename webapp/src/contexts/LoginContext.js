// LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameRoom, login, logout as apiLogout } from '../api';


const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [gameRoom, setGameRoom] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let gameRoom = new GameRoom()
        gameRoom.connection.on("sessionData", (data) => {
            console.log("Session data received:", data);
            gameRoom.roomData = data.roomData;
            gameRoom.user = data.user;
            setUser(data.user);
            setIsLoggedIn(true);
        });
        
        gameRoom.connection.on("disconnect", (data) => {
            console.log("Disconnected from server");
            setIsLoggedIn(false);
        });
        gameRoom.connection.on("connect_error", (error) => {
            console.error("Error connecting to server:", error);
            setIsLoggedIn(false);
        });
        gameRoom.connect()
        setGameRoom(gameRoom)
        return () => {
            if (gameRoom) gameRoom.disconnect();
        };
    }, []);

    const handleLogin = async (username, gameroomId) => {
        const result = await login(username, gameroomId);
        if (result.isSuccess) {
            gameRoom.connect();
        }
    };

    const handleLogout = () => {
        apiLogout();
        setIsLoggedIn(false);
        setUser(null);
        if(gameRoom.connection.connected) {
            gameRoom.disconnect();
        }
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, user: user, gameRoom, login: handleLogin, logout: handleLogout }}>
            {children}
        </LoginContext.Provider>
    );
};
