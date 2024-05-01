
import axios from 'axios';


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
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
        console.log("Logout successful");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
