import React, { useState } from "react";
import { useLogin } from "../../../contexts/LoginContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for card hover effect
const StyledCard = styled(Card)(({ theme }) => ({
    marginTop: "8px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    },
}));

function LoginForm() {
    const [username, setUsername] = useState("");
    const [gameroomId, setGameroomId] = useState("");
    const { login } = useLogin();

    const { isLoading, isError, data: rooms } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/gameroom`,
                { withCredentials: true }
            );
            return response.data;
        },
    });

    const handleRoomSelect = (roomId) => {
        setGameroomId(roomId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim() === "" || gameroomId.trim() === "") {
            alert("Please enter a username and select a game room.");
            return;
        }
        login(username, gameroomId);
    };

    return (
        <Box
            id="joinForm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto",
                padding: "16px",
                boxShadow: 3,
                borderRadius: "8px",
                backgroundColor: "background.paper",
            }}
        >
            <form onSubmit={handleSubmit} aria-labelledby="join-form-title">
                <Typography
                    id="join-form-title"
                    variant="h4"
                    textAlign="center"
                    gutterBottom
                >
                    Select a session to join
                </Typography>

                {rooms && (
                    <Box mt={2} mb={2}>
                        {rooms.map((room) => (
                            <StyledCard
                                key={room.id}
                                variant="outlined"
                                sx={{
                                    border: gameroomId === room.id ? "3px solid rgb(25, 118, 210)" : "background.paper",
                                }}
                                onClick={() => handleRoomSelect(room.id)}
                            >
                                <CardContent sx={{display: "flex", flexDirection: "column", textAlign: "center"}} >
                                    <Typography variant="h6">{room.id}</Typography>
                                </CardContent>
                            </StyledCard>
                        ))}
                    </Box>
                )}
                
                <TextField
                    label="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    fullWidth
                    margin="normal"
                />

                {isLoading && <Typography mt={2}>Loading game rooms...</Typography>}
                {isError && (
                    <Typography color="error" mt={2}>
                        Error loading game rooms. Please try again later.
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    Join
                </Button>
            </form>
        </Box>
    );
}

export default LoginForm;
