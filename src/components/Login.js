import React from 'react';
import {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        if(token['mytoken']) {
            navigate('/animes')
        }
    }, [token])

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token))
        .catch(error => console.log(error))
    }

    const RegisterBtn  = () => {
        APIService.RegisterUser({username, password})
        .then(() => loginBtn())
        .catch(error => console.log(error))

    }

    return (
        <div className = "App">
            <br/>
            <br/>
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
            <br/>
            <br/>

            <div className = "mb-3">
            <label htmlFor = "username" className = "form-label">username</label>
            <input type ="text" className = "form-control" id ="username" placeholder = "Please enter your username"
            value = {username} onChange = {e => setUsername(e.target.value)}
            />

            </div>

            <div className = "mb-3">
            <label htmlFor = "password" className = "form-label">password</label>
            <input type ="password" className = "form-control" id ="password" placeholder = "Please enter your password"
            value = {password} onChange = {e => setPassword(e.target.value)}
            />

            </div>

            {isLogin ?  <button onClick = {loginBtn} className = "btn btn-primary">Login</button> 
            :  <button onClick = {RegisterBtn} className = "btn btn-primary">Register</button>}

           

            <div className = 'mb-3'>
            <br/>
            {isLogin ? <h5>If you Don't have Account, Please <button className = "btn btn-primary" onClick = {() => setLogin(false)}>Register</button>Here</h5>
            
            : <h5>If you Have Account, Please <button className = "btn btn-primary" onClick = {() => setLogin(true)}>Login</button>Here</h5>}


            </div>

        </div>
    )
}

export default Login