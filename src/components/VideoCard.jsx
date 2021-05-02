import { useVideo } from "../context/video-context";
import { Link } from "react-router-dom";
import { WatchLaterBtn } from "./index";
import { usePlaylist } from "../context/playlist-context";

export function VideoCard({item}){
    const { dispatchPlaylist } = usePlaylist();
    const { dispatch } = useVideo();
    const {id, thumbnail, title, channelImage, channelName, time, duration} = item;
    
    return(
            <div className="videocard-container">
                
                <div className="positioned">
                    <Link to={`/video/${id}`} onClick={() => {
                        dispatch({type:"PLAY_VIDEO", payload: id});
                        dispatch({type: "ADD_TO_HISTORY", payload: item});
                    }}>
                        <img className="thumbnail" src={thumbnail} alt={title}/>
                    </Link>
                    <WatchLaterBtn item={item}/>
                    <div onClick={() => dispatchPlaylist({type:"SHOW_MODAL", payload: item})} className="playlist-btn"><i className="fas fa-list"></i></div>
                </div>
                <div className="videocard-info">
                    <div className="duration">{duration}</div>
                    <img className="normal-img" src={channelImage} alt="channel"/>
                    <div className="videocard-text">
                        <Link to={`/video/${id}`} className="title" onClick={() => {
                            dispatch({type:"PLAY_VIDEO", payload: id});
                            dispatch({type: "ADD_TO_HISTORY", payload: item});
                        }}>
                            {title}
                        </Link>
                        <p className="channel-name">{channelName}</p>
                        <p className="time">{time}</p>
                    </div>
                </div>
            </div>
                
    )
}