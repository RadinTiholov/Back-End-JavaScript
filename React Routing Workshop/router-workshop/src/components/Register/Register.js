import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import * as request from "../../services/requester"

export const Register = () => {
    const navigate = useNavigate();
    const [auth, userLogin, userLogout] = useContext(AuthContext);
    const [inputData, setInputData] = useState({
        email : "",
        password: "",
        rePassword: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            {...state, [e.target.name] : e.target.value}
            ))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(inputData.password === inputData.rePassword){
            request.post('http://localhost:3030/users/register', inputData)
            .then(res => {
                userLogin(res);
                navigate('/')
            })
            .catch(res => {
                navigate('/404')
            })
        }else{
            alert("Password and Repeat password doesn't match!")
        }
        
    }

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={inputData.email}
                        onChange = {onChange}
                    />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" value={inputData.password} onChange = {onChange}/>
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="rePassword" id="confirm-password" value={inputData.rePassword} onChange = {onChange}/>
                    <input className="btn submit" type="submit" defaultValue="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}