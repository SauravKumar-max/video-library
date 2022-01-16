import { videoReducer } from "./video-reducer";

describe("testing video reducer", () => {
    it("should toggle profile modal", () => {

        const initialState = {
            toggleProfile: false, 
            toggleLoginModal: false
        }

        const toggleProfileModal = {
            type: "TOGGLE_PROFILE_CARD",
        }

        const videoState = videoReducer(initialState, toggleProfileModal);

        expect(videoState).toEqual({
            toggleProfile: true, 
            toggleLoginModal: false
        });
    });

    it("should toggle login modal", () => {

        const initialState = {
            toggleProfile: false, 
            toggleLoginModal: false
        }

        const toggleProfileModal = {
            type: "TOGGLE_LOGIN_MODAL",
        }

        const videoState = videoReducer(initialState, toggleProfileModal);

        expect(videoState).toEqual({
            toggleProfile: false, 
            toggleLoginModal: true
        });

    });
});