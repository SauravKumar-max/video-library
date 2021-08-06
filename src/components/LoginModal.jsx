import { useNavigate } from "react-router-dom";
import { useVideo } from "../context/video-context"

export function LoginModal(){
    const { dispatch } = useVideo();
    const navigate = useNavigate()
    return(
        <div className="login-modal">
            <div className="login-backdrop"
                onClick={() =>  dispatch({type: "TOGGLE_LOGIN_MODAL"})}
            >
            </div>
            <div className="login-modal-container">
                <p>Please login</p>
                <div>
                    <button className="secondary-btn"
                        onClick={() => dispatch({type: "TOGGLE_LOGIN_MODAL"})}
                    >
                        Cancel
                    </button>
                    
                    <button className="primary-btn"
                        onClick={() => {
                            navigate('/login');
                            dispatch({type: "TOGGLE_LOGIN_MODAL"})
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}