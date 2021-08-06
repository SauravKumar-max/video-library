import { useNavigate } from "react-router-dom";
import { WatchLaterBtn } from "./index";
import { useData } from "../context/userdata-context";
import { useVideo } from "../context/video-context";
import { useAuth } from "../context/auth-context";

export function VideoCard({item}){
    const { dispatchData } = useData();
    const { _id, thumbnail, title, channelImage, channelName, time, duration } = item;
    const { dispatch } = useVideo()
    const { login } = useAuth();
    const navigate = useNavigate();
    
    return(
            <div className="videocard-container">
                <div className="positioned">
                    <div className="img-container">
                        <img 
                            className="thumbnail"
                            onClick={ () => navigate(`/video/${_id}`)} 
                            src={thumbnail} 
                            alt={title}
                        />
                    </div>
                    <WatchLaterBtn item={item}/>
                    <div className="playlist-btn"
                        onClick={() => login ? dispatchData({ type:"TOGGLE_MODAL", payload: item }) : dispatch({type: "TOGGLE_LOGIN_MODAL"})} 
                    >
                        <i className="fas fa-list"></i>
                    </div>
                </div>
                <div className="videocard-info">
                    <div className="duration">{duration}</div>
                    <img className="normal-img" src={channelImage} alt="channel"/>
                    <div className="videocard-text">
                        <div 
                            onClick={ () => navigate(`/video/${_id}`)} 
                            className="title" 
                            title={title} 
                        >
                            {title}
                        </div>
                        <p className="channel-name">{channelName}</p>
                        <p className="time">{time}</p>
                    </div>
                </div>
            </div>
                
    )
}