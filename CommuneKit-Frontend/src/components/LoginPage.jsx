import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../services/UserService.jsx";


function LoginPage(){
    localStorage.clear();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleRegistration = () => {
        navigate('/registration');  // Navigates to /registration when button is clicked
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDto = {
            userName: username,
            password: password
        };

        try {
            let loginJson = {
                userName: userDto.userName,
                password: userDto.password
            }
            //await is necessary, otherwise result will pend forever
            //JSON.stringify turns the key-value pair object into a JSON string
            //backend needs it to be a string
            const userData = await loginUser(JSON.stringify(loginJson))
            //all the data is in userData.data.<keyname>
            console.log(userData);
            if (userData.status === 200) {
                localStorage.setItem('token', "LoggedIn")
                localStorage.setItem('role', userData.data.role) //
                localStorage.setItem('userID', userData.data.userId)
                //localStorage.getItem('userID')
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
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
            <h2>Create account</h2>
            <div>
                <button onClick={handleRegistration}>
                    Go to Registration
                </button>
            </div>
        </div>
    )

}

export default LoginPage;