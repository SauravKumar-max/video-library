import { Sidebar } from "./Sidebar";
import { UserHistory } from "./UserHistory";

export function History(){
    return(
        <div className="grid">
            <Sidebar/>
            <UserHistory/>            
        </div>
    )
}