export const playlistReducer = ( statePlaylist, action ) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return { ...statePlaylist, toggleModal: action.payload };
            
        case "HIDE_MODAL":
            return { ...statePlaylist, toggleModal: null };

        case "SHOW_CREATE":
            return { ...statePlaylist, createPlaylist: "show" };

        case "HIDE_CREATE":
            return { ...statePlaylist, createPlaylist: "hide" };

        case "TAKE_INPUT":
            return { ...statePlaylist, inputEl: action.payload };

        case "CREATE_PLAYLIST":
            return { ...statePlaylist, playlist: { ...statePlaylist.playlist, [statePlaylist.inputEl]: []}, inputEl: ""}
        
        case "ADD_TO_PLAYLIST": 
            return { 
                ...statePlaylist, 
                playlist: {...statePlaylist.playlist, 
                    [action.payload]: [...statePlaylist.playlist[action.payload], statePlaylist.toggleModal] 
                } 
            };

        case "REMOVE_FROM_PLAYLIST":
            return { 
                ...statePlaylist, 
                playlist: {...statePlaylist.playlist, 
                    [action.payload]: [...statePlaylist.playlist[action.payload].filter(item => item.id !== statePlaylist.toggleModal.id)] 
                } 
            };

        case "SHOW_CURRENT_PLAYLIST":
            return { ...statePlaylist, currentPlaylist: action.payload };

        case "DELETE_PLAYLIST":
            return {...statePlaylist, playlist: {...statePlaylist.playlist, ...delete statePlaylist.playlist[action.payload] } };

        default:
            break;
    }
}
