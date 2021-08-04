import { Link, useNavigate } from "react-router-dom";
import { useVideo } from "../context/video-context";
import { ProfileCard } from "./index";

export function Navbar(){
    const { state, dispatch } = useVideo();
    const navigate = useNavigate();
    return(
        <>
            <nav className="navbar">
                <p onClick={() => navigate('/')}>NeuroTube</p>
                            
                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                                
                <ul className="navbar-lists">
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="playlists" >Playlist</Link></li>
                    <li><Link to="history">History</Link></li>
                    <li>
                        <span 
                            style={{fontSize: "1.4rem"}}
                            onClick={() => dispatch({type: "TOGGLE_PROFILE_CARD"})}>
                            <i className="fas fa-user-circle"></i>
                        </span>
                    </li>
                </ul>
            </nav>

            { state.toggleProfile && <ProfileCard/> }
        </>
    )
}