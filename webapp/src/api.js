
import axios from 'axios';
import { Socket, io } from 'socket.io-client';


export const login = async (username, gameroomId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, gameroomId }, { withCredentials: true });
        return { username, gameroomId, isSuccess: true };
    } catch (error) {
        console.error("Error logging in:", error);
        return { isSuccess: false, error };
    }
};

export const logout = async () => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
        console.log("Logout successful");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getAllGameRooms = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/gameroom`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error getting game rooms:", error);
        return [];
    }
}

export const getChallenges = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenges`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error getting challenges:", error);
        return [];
    }
};

export class GameRoom {


    constructor() {
        this.roomData = null;
        this.user = null;
        this.connection = io(`${process.env.REACT_APP_API_URL}`, { autoConnect: false, withCredentials: true });
        this.connection.on("connect", () => {
            console.log("Sucessfully established socket connection with server");
        });
        this.connection.on("disconnect", () => {
            console.log("Disconnected socket from server");
        });
    }


    connect() {
        this.connection.connect();
    }

    disconnect() {
        this.connection.disconnect();
    }

    // Method to emit events or send messages can be added here
}