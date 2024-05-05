import { useLogin } from "../../../contexts/LoginContext";

function LoginForm() {
    const { isLoggedIn, user, gameRoom, login, logout } = useLogin();

    return <div id="joinForm" style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <form onSubmit={function(event){
                    event.preventDefault();
                    login(document.getElementById('username').value, document.getElementById('gameroomId').value);
                }}>
                    <h1 style={{textAlign: "center"}}>Join a session</h1>
                    <input type="text" id="username" placeholder="Username" />
                    <input type="text" id="gameroomId" placeholder="Game Room ID" />
                    <button>Join</button>
                </form>
            </div>
}

export default LoginForm;