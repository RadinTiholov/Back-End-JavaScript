import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import * as reqest from "../../services/requester" 

export const Login = () => {
    const [auth, setAuth] = useContext(AuthContext)
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email : "",
        password: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            {...state, [e.target.name] : e.target.value}
            ))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        reqest.post('http://localhost:3030/users/login', inputData)
            .then(res => {
                setAuth(res);
                navigate('/')
            })
            .catch(() => {navigate('/404')})
    }

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                        onChange={onChange}
                        value = {inputData.email}
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        onChange={onChange} 
                        value = {inputData.password}
                        name="password"
                    />
                    <input type="submit" className="btn submit" defaultValue="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}