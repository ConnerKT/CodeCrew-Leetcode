// LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout as apiLogout } from '../api';
import { io } from 'socket.io-client';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [gameRoom, setGameRoom] = useState(null);


    useEffect(() => {
        let socketconn = io(process.env.REACT_APP_API_URL, { withCredentials: true , autoConnect: false})
                            .on("connect", (socket) => {
                                console.log({socket})
                            })
                            .on("connect_error", (err) => {
                                console.error(err.message)
                            })
                            .on("sessionData", (sessionData) => {
                                setUser({ username: sessionData.username, gameRoomId: sessionData.gameRoomId });
                                setIsLoggedIn(true);
                            })
                            .on("roomData", (roomData) => {
                                console.log(roomData)
                                setGameRoom(roomData)
                            })
                            socketconn.connect()


        return () => {
            if (socketconn) socketconn.close();
        };
    }, []);

    const handleLogin = async (username, gameroomId) => {
        const result = await login(username, gameroomId);
        if (result.isSuccess) {
            setIsLoggedIn(true);
            setUser({ username: result.username });
            setGameRoom({ gameroomId: result.gameroomId });
        }
    };

    const handleLogout = () => {
        apiLogout();
        setIsLoggedIn(false);
        setUser(null);
        setGameRoom(null);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, user, gameRoom, login: handleLogin, logout: handleLogout }}>
            {children}
        </LoginContext.Provider>
    );
};
