import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SkeletonPlayer } from "../components/index";
import { useAuth } from "../context/auth-context";
import { useData } from "../context/userdata-context";
import { useVideo } from "../context/video-context";

export function VideoPlayer(){
    const [ video, setVideo ] = useState([]);
    const [ loader, setLoader ] = useState(true);
    const { stateData, dispatchData } = useData();
    const { login, token } = useAuth();
    const { dispatch } = useVideo();
    const { watchLater, liked, allNotes } = stateData;
    const { _id, time, videoUrl, title } = video;
    const location = useLocation();
    const splitURL = location.pathname.split("/");
    const videoId = splitURL[splitURL.length - 1];
    const getNotes = allNotes.find(item => item._id === videoId);

    useEffect(() => {
        (async () => {
            setLoader(true);
            try{
                const api = `https://Video-Library-Backend.sauravkumar007.repl.co/videos/${videoId}`;
                const response = await axios.get(api);
                const fetchVideo = response.data.video;
                setLoader(false);   
                setVideo(fetchVideo);  
                if(fetchVideo && token){
                    const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/history/${fetchVideo._id}`
                    await axios.post(api);
                    dispatchData({type: "ADD_TO_HISTORY", payload: fetchVideo});
                } 
            }catch(err){
                console.error(err);
            }
        })()
        
    }, [videoId, dispatchData, token]);


    async function addToLike(){
        dispatchData({type: "ADD_TO_LIKE", payload: video})            
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/likedVideos/${_id}`;
            await axios.post(api);
        } catch (error) {
            console.log(error);
        }
    }

    async function removeFromLike(){
        dispatchData({type: "REMOVE_FROM_LIKE", payload: _id});
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/likedVideos/${_id}`;
            await axios.delete(api);
        } catch (error) {
            console.log(error)
        }
    }

    async function addToWatchLater(){
        dispatchData({type: "ADD_TO_WATCHLATER", payload: video})
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/watchLater/${_id}`;
            await axios.post(api);
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromWatchLater(){
        dispatchData({type: "REMOVE_FROM_WATCHLATER", payload: _id})
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/watchLater/${_id}`;
            await axios.delete(api);
        } catch (error) {
            console.log(error) 
        }
    }

    async function addNotes(inputValue){
        if(getNotes){
            dispatchData({type: "ADD_NOTES", payload: {videoId, inputValue}});
        }else{
            dispatchData({type: "ADD_NEW_NOTES", payload: { videoId, inputValue }});
        }
        try{
            const api = "https://Video-Library-Backend.sauravkumar007.repl.co/userdata/notes";
            await axios.post(api, { videoId, noteToTake: inputValue });
        }catch(error){
            console.log(error);
        }
    }


    return(
        <div className="video-page">   
            {
                loader ? <SkeletonPlayer/> 
                :
                <div className="video-player">
                    <iframe 
                        src={videoUrl} 
                        title="video"
                        frameBorder="0" 
                        allowFullScreen />

                    <div className="video-details">
                        <p className="video-title">{title}</p>
                        <div className="video-action">
                            <p>{time}</p>
                            <div>
                                {
                                    liked?.find(item => item._id === _id) ? 
                                    <span 
                                        className="liked-video" 
                                        onClick={ removeFromLike }
                                    > 
                                        <i className="fas fa-thumbs-up"></i> 
                                    </span>
                                    :
                                    <span 
                                        onClick={ login ? addToLike : () => dispatch({type: "TOGGLE_LOGIN_MODAL"}) }
                                    > 
                                        <i className="fas fa-thumbs-up"></i> 
                                    </span>
                                }
                                {
                                    watchLater?.find(item => item._id === _id) ?
                                    <span 
                                        className="liked-video"  
                                        onClick={ removeFromWatchLater } 
                                    >
                                        <i className="fas fa-clock"></i>
                                    </span>
                                    :
                                    <span 
                                        onClick={ login ? addToWatchLater : () => dispatch({type: "TOGGLE_LOGIN_MODAL"}) }
                                    >
                                        <i className="fas fa-clock"></i>
                                    </span>
                                }
                                <span 
                                    onClick={() => login ? dispatchData({ type: "TOGGLE_MODAL", payload: video }) : dispatch({type: "TOGGLE_LOGIN_MODAL"})}
                                > 
                                    <i className="fas fa-list"></i>  
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            }
            <div className="notes-container">
                <div className="notes-list">
                    {getNotes?.notes.map(item => {
                        return(
                            <div className="notes-items" key={item}>{item}</div>
                        )
                    })}
                </div>
                <input type="text" placeholder="Take Notes..."
                    className="text-input"
                    onKeyUp={(e) => {
                        if((e.key === "Enter") && (e.target.value !== "")){
                            if(login){
                                addNotes(e.target.value);
                                e.target.value = "";
                            }else{
                                dispatch({type: "TOGGLE_LOGIN_MODAL"})
                            }
                            
                        }
                    }}
                />
            </div>
        </div>
    )
}
