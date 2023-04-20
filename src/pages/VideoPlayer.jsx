import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SkeletonPlayer } from "../components/index";
import { useAuth } from "../context/auth-context";
import { useData } from "../context/userdata-context";
import { useVideo } from "../context/video-context";
import { useDataCall } from "../hooks/userdataAPICalls";

export function VideoPlayer() {
  const { id: videoId } = useParams();
  const { stateData, dispatchData } = useData();
  const { login, token } = useAuth();
  const { loader, videoData, dispatch } = useVideo();
  const { watchLater, liked, allNotes } = stateData;
  const video = videoData?.find((item) => item._id === videoId);
  const { _id, time, videoUrl, title } = video || {};
  const newVideoUrl = videoUrl?.replace("https://", "https://www.");
  const getNotes = allNotes?.find((notes) => notes._id === videoId);
  const {
    removeFromLike,
    addToLike,
    removeFromWatchLater,
    addToWatchLater,
    addNotes,
  } = useDataCall();

  useEffect(() => {
    if (login && token) {
      (async () => {
        try {
          const api = `https://neurotube-backend.onrender.com/userdata/history/${videoId}`;
          await axios.post(api);
          dispatchData({ type: "ADD_TO_HISTORY", payload: video });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [videoId, dispatchData, login, video, token]);

  return (
    <div className="video-page">
      {loader ? (
        <SkeletonPlayer />
      ) : (
        <div className="video-player">
          <iframe
            src={newVideoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="video-details">
            <p className="video-title">{title}</p>
            <div className="video-action">
              <p>{time}</p>
              <div>
                {liked?.find((item) => item._id === _id) ? (
                  <span
                    className="liked-video"
                    onClick={() => removeFromLike(_id)}
                  >
                    <i className="fas fa-thumbs-up"></i>
                  </span>
                ) : (
                  <span
                    onClick={
                      login
                        ? () => addToLike(video, _id)
                        : () => dispatch({ type: "TOGGLE_LOGIN_MODAL" })
                    }
                  >
                    <i className="fas fa-thumbs-up"></i>
                  </span>
                )}
                {watchLater?.find((item) => item._id === _id) ? (
                  <span
                    className="liked-video"
                    onClick={() => removeFromWatchLater(_id)}
                  >
                    <i className="fas fa-clock"></i>
                  </span>
                ) : (
                  <span
                    onClick={
                      login
                        ? () => addToWatchLater(video)
                        : () => dispatch({ type: "TOGGLE_LOGIN_MODAL" })
                    }
                  >
                    <i className="fas fa-clock"></i>
                  </span>
                )}
                <span
                  onClick={() =>
                    login
                      ? dispatchData({ type: "TOGGLE_MODAL", payload: video })
                      : dispatch({ type: "TOGGLE_LOGIN_MODAL" })
                  }
                >
                  <i className="fas fa-list"></i>
                </span>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )}
      <div className="notes-container">
        <div className="notes-list">
          {getNotes?.notes.map((item) => {
            return (
              <div className="notes-items" key={item}>
                {item}
              </div>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Take Notes..."
          className="text-input"
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.target.value !== "") {
              if (login) {
                const value = e.target.value;
                addNotes(getNotes, value, videoId);
                e.target.value = "";
              } else {
                dispatch({ type: "TOGGLE_LOGIN_MODAL" });
              }
            }
          }}
        />
      </div>
    </div>
  );
}
