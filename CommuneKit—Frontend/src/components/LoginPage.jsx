import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService.jsx";


function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDto = {
            username: username,
            password: password
        };

        try {
            const userData = await UserService.login(userDto)
            console.log(userData)
            if (userData.status === 200) {
                localStorage.setItem('token', "LoggedIn")
                localStorage.setItem('role', userData.role)
                localStorage.setItem('user', JSON.stringify(userData))
                navigate('/home')
            } else {
                setError(userData.message)
            }

        } catch (error) {
            console.log(error)
            setError(error.message)
            setTimeout(()=>{
                setError('');
            }, 5000);
        }
    }


    return(
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default LoginPage;