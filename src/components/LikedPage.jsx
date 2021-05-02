import { Sidebar, UserLikedVideo } from "./index";

export function LikedPage(){
    return(
        <div className="grid">
            <Sidebar/>
            <UserLikedVideo/>
        </div>
    )
}