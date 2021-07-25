import { Sidebar, VideoCard } from "../components/index";
import { useVideo } from "../context/video-context";

export function Home(){
    const { videoData } = useVideo();

    return(
        <div className="grid">
            <Sidebar/>
            <div className="videolist-container">
                {videoData?.map(item => {
                    return(
                        <VideoCard key={item._id} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}