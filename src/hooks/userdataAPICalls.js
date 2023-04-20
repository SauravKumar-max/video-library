import axios from "axios";
import { useState } from "react";
import { useData } from "../context/userdata-context";

export function useDataCall() {
  const [loader, setLoader] = useState(false);
  const { dispatchData } = useData();
  const uri = "https://neurotube-backend.onrender.com";

  // Playlist

  async function createNewPlaylist(inputValue, video, setValue) {
    setLoader(true);
    try {
      const api = uri + "/userdata/playlist";
      const response = await axios.post(api, {
        name: inputValue,
        _id: video._id,
      });
      const { updatedList } = response.data;
      const _id = updatedList[updatedList.length - 1]._id;
      setLoader(false);
      dispatchData({
        type: "CREATE_PLAYLIST",
        payload: { _id, name: inputValue, list: [video] },
      });
      dispatchData({ type: "SHOW_SNACKBAR", payload: "Added To Playlist" });
      setValue("");
    } catch (error) {
      console.log(error);
    }
  }

  async function addToPlaylist(item, videoId, playlistModal) {
    try {
      const api = uri + "/userdata/playlist";
      axios.post(api, { name: item.name, _id: videoId });
      dispatchData({
        type: "ADD_TO_PLAYLIST",
        payload: { playlistId: item._id, video: playlistModal.video },
      });
      dispatchData({ type: "SHOW_SNACKBAR", payload: "Added To Playlist" });
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromPlaylist(playlistId, videoId) {
    dispatchData({
      type: "REMOVE_FROM_PLAYLIST",
      payload: { playlistId, videoId },
    });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Removed From Playlist" });
    try {
      const api = uri + "/userdata/playlist/remove";
      await axios.post(api, { playlistId, videoId });
    } catch (error) {
      console.log(error);
    }
  }

  async function removePlaylist(_id) {
    dispatchData({ type: "REMOVE_PLAYLIST", payload: _id });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Playlist Removed" });
    try {
      const api = uri + "/userdata/playlist/remove";
      await axios.post(api, { playlistId: _id });
    } catch (error) {
      console.log(error);
    }
  }

  // History

  async function removeFromHistory(_id) {
    dispatchData({ type: "REMOVE_FROM_HISTORY", payload: _id });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Removed From History" });
    try {
      const api = uri + `/userdata/history/${_id}`;
      await axios.delete(api);
    } catch (error) {
      console.log(error);
    }
  }

  // Like

  async function addToLike(video, _id) {
    dispatchData({ type: "ADD_TO_LIKE", payload: video });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Like Added" });
    try {
      const api = uri + `/userdata/likedVideos/${_id}`;
      await axios.post(api);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromLike(_id) {
    dispatchData({ type: "REMOVE_FROM_LIKE", payload: _id });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Like Removed" });
    try {
      const api = uri + `/userdata/likedVideos/${_id}`;
      await axios.delete(api);
    } catch (error) {
      console.log(error);
    }
  }

  // Watch Later

  async function addToWatchLater(video) {
    dispatchData({ type: "ADD_TO_WATCHLATER", payload: video });
    dispatchData({ type: "SHOW_SNACKBAR", payload: "Added To Watch Later" });
    try {
      const api = uri + `/userdata/watchLater/${video._id}`;
      await axios.post(api);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWatchLater(_id) {
    dispatchData({ type: "REMOVE_FROM_WATCHLATER", payload: _id });
    dispatchData({
      type: "SHOW_SNACKBAR",
      payload: "Removed From Watch Later",
    });
    try {
      const api = uri + `/userdata/watchLater/${_id}`;
      await axios.delete(api);
    } catch (error) {
      console.log(error);
    }
  }

  // Notes

  async function addNotes(getNotes, inputValue, videoId) {
    if (getNotes) {
      dispatchData({ type: "ADD_NOTES", payload: { videoId, inputValue } });
    } else {
      dispatchData({ type: "ADD_NEW_NOTES", payload: { videoId, inputValue } });
    }
    try {
      const api = uri + "/userdata/notes";
      await axios.post(api, { videoId, noteToTake: inputValue });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loader,
    createNewPlaylist,
    removeFromHistory,
    removeFromLike,
    removeFromWatchLater,
    removeFromPlaylist,
    removePlaylist,
    addToPlaylist,
    addToWatchLater,
    addToLike,
    addNotes,
  };
}
