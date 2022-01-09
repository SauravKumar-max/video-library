import { useEffect } from "react/cjs/react.development";
import { useData } from "../context/userdata-context"

export function Snackbar(){
    const { stateData, dispatchData } = useData();
    const { show, message } = stateData.snackbar;

    useEffect(() => {
        let timer;
        if(show){
            timer = setTimeout(() => dispatchData({type: "HIDE_SNACKBAR" }), 1500); 
        }
        return () => clearTimeout(timer);
    }, [ dispatchData, show ])

    return(
        <div className="snackbar">
            <p>{message}</p>
        </div>
    )
}