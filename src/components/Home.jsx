import { Sidebar } from "./Sidebar";
import { VideoList } from "./VideoList";

export function Home(){
    return(
        <div className="grid">
            <Sidebar/>
            <VideoList/>
        </div>
    )
}