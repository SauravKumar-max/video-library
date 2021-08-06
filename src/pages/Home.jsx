import { Sidebar, SkeletonCard, VideoCard } from "../components/index";
import { useVideo } from "../context/video-context";

export function Home(){
    const { videoData, loader } = useVideo();
    const skeleton =  [...Array(12)];

    return(
        <div className="grid">
            <Sidebar/>
            <div className="videolist-container">
                {loader && skeleton.map((element, i) => <SkeletonCard key={i}/>)}
                {
                    videoData?.map(item => {
                        return(
                            <VideoCard key={item._id} item={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}