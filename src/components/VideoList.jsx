import { useVideo } from "../context/video-context";
import { VideoCard } from "./VideoCard";

export function VideoList(){
    const { state } = useVideo();
    const { data } = state;
    return(
        <div className="videolist-container">
            {data.map(item => {
                return(
                    <VideoCard key={item.id} item={item}/>
                )
            })}
        </div>
    )
}