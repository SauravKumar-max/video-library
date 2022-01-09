import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth-context";
import { Loader } from "../components/index";

export function SignUp(){
    const [ inputs, setInputs ] = useState({ name: "", username: "", email: "", password: "", confirmPassword: ""})
    const [ checkForm, setCheckForm ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ spinner, setSpinner ] = useState(false);
    const { login, loginUserWithCredentials } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if(login){
            navigate(state?.from ? state.from : '/');
        }
    }, [login, navigate, state])


    useEffect(() => {
        const { name, username, email, password, confirmPassword } = inputs;   
        if(name !== "" && username !== "" && email !== "" && password !== "" && confirmPassword !== ""){
            if(password === confirmPassword){
                return setCheckForm(true)
            }
        }return setCheckForm(false);
    }, [inputs]);


    async function newUserSignUp(){
        setSpinner(true);
        try {
            const api = "https://Video-Library-Backend.sauravkumar007.repl.co/user";
            const response = await axios.post(api, { name: inputs.name.toUpperCase(), username: inputs.username, email: inputs.email, password: inputs.password });
            if(response.status === 200){
                loginUserWithCredentials(inputs.email, inputs.password);
            }
        } catch (error) {
            console.log(error);
        }  
    }
        
    return(
        <div className="login-container">
            <h2>Sign Up</h2>
            <input 
                className="text-input" 
                type="text" 
                placeholder="Name" 
                onChange={(e) => setInputs(input => ({ ...input, name: e.target.value}))} 
            />
            <input 
                className="text-input" 
                type="text" 
                placeholder="UserName"
                onChange={(e) => setInputs(input => ({ ...input, username: e.target.value}))}
            />
            <input 
                className="text-input" 
                type="email" 
                placeholder="Email"
                onChange={(e) => setInputs(input => ({ ...input, email: e.target.value}))} 
            />
    
            <div className="password-field">
                <input 
                    className="text-input" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password"
                    onChange={(e) => setInputs(input => ({ ...input, password: e.target.value}))}
                />
                { showPassword && <i className="fas fa-eye" onClick={() => setShowPassword(false)}></i> }
                { !showPassword && <i className="fas fa-eye-slash" onClick={() => setShowPassword(true)}></i> }

            </div>
            
            <input 
                className="text-input" 
                type="password" 
                placeholder="Re-enter Password"
                onChange={(e) => setInputs(input => ({ ...input, confirmPassword: e.target.value}))}
            />
            <button 
                disabled={ !checkForm }
                className={!checkForm ? "primary-btn disabled-btn": "primary-btn" }
                onClick={ newUserSignUp }
            >
                { spinner ? <Loader color={"#fff"}/> : "Sign Up" } 
            </button>
            <small>Already have an account. <span onClick={() => navigate('/login')}> Login </span> </small>
        </div>
    )
}