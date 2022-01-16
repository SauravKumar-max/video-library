
export const videoReducer = (state, action) => {    
    switch (action.type) {
        case "TOGGLE_PROFILE_CARD":
            return { ...state, toggleProfile: !state.toggleProfile };

        case "TOGGLE_LOGIN_MODAL":
            return { ...state, toggleLoginModal: !state.toggleLoginModal };
       
        default:
            return state;
    }
}