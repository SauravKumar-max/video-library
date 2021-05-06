import { useVideo } from "../context/video-context";
import { Link } from "react-router-dom";
import { WatchLaterBtn } from "./index";
import { usePlaylist } from "../context/playlist-context";


export function HorizontalCard({item}){
    const { dispatch } = useVideo();
    const { id, thumbnail, title, channelName, time, duration, description } = item;
    const { dispatchPlaylist } = usePlaylist();
    return(
        <div className="hz-card">
            <div className="positioned">
                <img className="thumbnail" src={thumbnail} alt="thumbnail" />
                <WatchLaterBtn item={item}/>
                <div onClick={() => dispatchPlaylist({type:"SHOW_MODAL", payload: item})} className="playlist-btn"><i className="fas fa-list"></i></div>
            </div>

            <div className="videocard-info">
                <div className="hz-duration">{duration}</div>
                <div className="hzvideocard-text">
                    <Link to={`/video/${id}`} className="title" onClick={() => {
                        dispatch({type:"PLAY_VIDEO", payload: id});
                        dispatch({type: "ADD_TO_HISTORY", payload: item});
                    }}>
                        {title}
                    </Link>
                    
                    <p className="channel-name">{channelName}</p>
                    <p className="time">{time}</p>
                    <p className="description">{description}</p>

                </div>
            </div>
        </div>
    )
}