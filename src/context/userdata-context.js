import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { dataReducer } from "../reducer/userdata-reducer";
import { useAuth } from "./auth-context";
import axios from "axios";


const Data = createContext();

export function DataProvider({children}){
    const { token } = useAuth();
    const [ dataLoader, setDataLoader ] = useState(false);

    const data = {
        liked: [],
        history: [],
        watchLater: [],
        allNotes: [],
        playlist: [],
        playlistModal: {
            show: false,
            video: null,
        },
        snackbar: {
            show: false,
            message: ""
        }
    }

    const [ stateData, dispatchData ] = useReducer(dataReducer, data)

    useEffect(() => {
        if(token){
            setDataLoader(true);
            (async () => {
                try{
                    const api = 'https://Video-Library-Backend.sauravkumar007.repl.co/userdata';
                    const response = await axios.get(api);
                    const fetchData = response.data;
                    setDataLoader(false);
                    dispatchData({ type: "FETCH_DATA", payload: fetchData });
                }catch(error){
                    console.log(error);
                }
                
            })()  
        }       
    }, [token])

    return(
        <Data.Provider value={{ stateData, dispatchData, dataLoader, setDataLoader  }}>
            {children}
        </Data.Provider>
    )
}

export function useData(){
    return useContext(Data);
}
