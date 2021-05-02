import { Sidebar } from "./index";
import { UserPlaylist } from "./index";

export function PlaylistPage(){
    return(
        <div className="grid">
            <Sidebar/>
            <UserPlaylist/>
        </div>
    )
}