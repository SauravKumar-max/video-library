import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useVideo } from "../context/video-context";
import { Loader } from "./index";

export function ProfileCard(){
    const { login, token, logout } = useAuth();
    const { dispatch } = useVideo();
    const [ userData, setUserData ] = useState({});
    const [ spinner, setSpinner ] = useState(false);
    const navigate = useNavigate();

    function logoutAndClearDataInFrontend(){
        logout();
        navigate('/');
    }

    useEffect(() => {
        (async () => {
            setSpinner(true);
            if(token){
                try {
                    const api = "https://Video-Library-Backend.sauravkumar007.repl.co/user";
                    const response = await axios.get(api);
                    const user = response.data;
                    setUserData( user );
                    setSpinner(false);
                } catch (error) {
                    console.log(error);
                }
            } 
        })()
        return () => setUserData({});
    }, [token])

    function UserInfo(){
        return(
            <>
            {
                spinner ? <div style={{ transform: "translateY(150%)" }}> <Loader color={"#3d41d7"} /> </div> : 
                <div className="user-info">
                    <h3> Hi, <span> { userData.username } </span></h3>
                    <p> { userData.email } </p>
                    <button 
                        className="secondary-btn" 
                        onClick={ logoutAndClearDataInFrontend }
                    > 
                        Logout 
                    </button>
                </div>
            }
            </>
        )
    }

    function AskUserToLogin(){
        return(
            <div className="user-info">
                <h3>To access account</h3>
                <h3> Please LogIn.</h3>
                <button 
                    className="secondary-btn"
                    onClick={() => { 
                        navigate('/login');
                        dispatch({type: "TOGGLE_PROFILE_CARD"});
                    }}
                > 
                    Login or SignUp 
                </button>
            </div>
        )
    }

    return (
        <div className="profile-container">
        <div 
            className="profile-backdrop"
            onClick={() => dispatch({type: "TOGGLE_PROFILE_CARD"})}
        >
        </div>
        <div className="profile-card">
            { login ? <UserInfo/> : <AskUserToLogin/> }
        </div>
    </div>
    )
}