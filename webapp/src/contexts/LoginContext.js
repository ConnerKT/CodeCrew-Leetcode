// LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameRoom, login, logout as apiLogout } from '../api';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [gameRoomState, setGameRoomState] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let gameRoom = new GameRoom();
        
        gameRoom.connection.on("sessionData", (data) => {
            console.log("Session data received:", data);
            gameRoom.roomData = data.roomData;
            gameRoom.user = data.user;
            setUser({ ...data.user, submissionsStore: {} });
            setIsLoggedIn(true);
        });
        
        gameRoom.connection.on("disconnect", () => {
            console.log("Disconnected from server");
            setIsLoggedIn(false);
        });
        
        gameRoom.connection.on("connect_error", (error) => {
            console.error("Error connecting to server:", error);
            setIsLoggedIn(false);
        });

        gameRoom.connection.on("roomUpdate", (data) => {
            console.log("Room update received:", data);
            setGameRoomState((prevGameRoomState) => ({
                ...prevGameRoomState,
                roomData: data,
            }));
        });
        
        gameRoom.connection.on("submissionResult", (data) => {
            // console.log("Submission result received:", data);
            setUser((prevUser) => ({
                ...prevUser,
                submissionsStore: {...prevUser?.submissionsStore, [data.challengeId]: data}
            }));
        });
        gameRoom.connect();
        setGameRoomState(gameRoom);

        return () => {
            if (gameRoom) gameRoom.disconnect();
        };
    }, []);

    const handleLogin = async (username, gameroomId) => {
        const result = await login(username, gameroomId);
        if (result.isSuccess) {
            gameRoomState.connect();
        }
    };

    const handleLogout = () => {
        apiLogout();
        setIsLoggedIn(false);
        setUser(null);
        if (gameRoomState.connection?.connected) {
            gameRoomState.disconnect();
        }
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, user, gameRoom: gameRoomState, login: handleLogin, logout: handleLogout }}>
            {children}
        </LoginContext.Provider>
    );
};
