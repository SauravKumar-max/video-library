import { dataReducer } from './userdata-reducer';

describe("testing user data", () => {
    it("should give specific user data from nothing!", () => {

        const stateData = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addData = {
            type: "FETCH_DATA",
            payload: {
                likedVideos: [
                    {
                        _id: "121",
                        title: "video one"
                    }
                ],

                history: [
                    {
                        _id: "122",
                        title: "video two"
                    }
                ],

                watchLater: [
                    {
                        _id: "123",
                        title: "video three",
                    }
                ],

                allNotes: [
                    {
                        _id: "122",
                        notes: ["note one", "note two"]
                    }
                ],

                playlist: [
                    {
                        _id: "212",
                        name: "first playlist",
                        list: [
                            {
                                _id: "124",
                                title: "video four",
                            }, 
                            {
                                _id: "123",
                                title: "video three"
                            }
                        ]
                    }

                ],
            }
        };


        const userState = dataReducer(stateData, addData);

        expect(userState).toEqual({
            liked: [
                {
                    _id: "121",
                    title: "video one"
                }
            ],

            history: [
                {
                    _id: "122",
                    title: "video two"
                }
            ],

            watchLater: [
                {
                    _id: "123",
                    title: "video three",
                }
            ],

            playlist: [
                {
                    _id: "212",
                    name: "first playlist",
                    list: [
                        {
                            _id: "124",
                            title: "video four",
                        }, 
                        {
                            _id: "123",
                            title: "video three"
                        }
                    ]
                }

            ],

            allNotes: [
                {
                    _id: "122",
                    notes: ["note one", "note two"]
                }
            ],

            playlistModal: {
                show: false,
                video: null,
            },
        });
    });

    it("should add to liked videos list", () => {

        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addToLike = {
            type: "ADD_TO_LIKE",
            payload: {
                _id: "123",
                title: "video three"
            }
        }

        const userState = dataReducer(initialState, addToLike);

        expect(userState).toEqual({
            liked: [
                {
                    _id: "123",
                    title: "video three"
                }
            ],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should remove from liked videos list", () => {
        const initialState = {
            liked: [
                {
                    _id: "121",
                    title: "video one"
                },
                {
                    _id: "123",
                    title: "video three"
                },
            ],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const removeFromLike = {
            type: "REMOVE_FROM_LIKE",
            payload: "123"
        }


        const userState = dataReducer(initialState, removeFromLike);

        expect(userState).toEqual({
            liked: [
                {
                    _id: "121",
                    title: "video one"
                }
            ],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })

    });

    it("should add to history video list", () => {
        const initialState = {
            liked: [],
            history: [
                {
                    _id: "122",
                    title: "video two"
                },
                {
                    _id: "121",
                    title: "video one"
                }
            ],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addToHistory = {
            type: "ADD_TO_HISTORY",
            payload: {
                _id: "123",
                title: "video three"
            }
        }

        let userState = dataReducer(initialState, addToHistory);

        expect(userState).toEqual({
            liked: [],
            history: [
                {
                    _id: "122",
                    title: "video two"
                },
                {
                    _id: "121",
                    title: "video one"
                },
                {
                    _id: "123",
                    title: "video three"
                }
            ],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })

        const updateHistory = {
            type: "ADD_TO_HISTORY",
            payload: {
                _id: "121",
                title: "video one"
            }
        }

        userState = dataReducer(userState, updateHistory);

        expect(userState).toEqual({
            liked: [],
            history: [                
                {
                    _id: "122",
                    title: "video two"
                },
                {
                    _id: "123",
                    title: "video three"
                },
                {
                    _id: "121",
                    title: "video one"
                }
            ],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should remove from history video list", () => {
        const initialState = {
            liked: [],
            history: [
                {
                    _id: "122",
                    title: "video two"
                },
                {
                    _id: "121",
                    title: "video one"
                },
                {
                    _id: "123",
                    title: "video three"
                }
            ],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const removeFromHistory = {
            type: "REMOVE_FROM_HISTORY",
            payload: "121"
        }

        const userState = dataReducer(initialState, removeFromHistory);

        expect(userState).toEqual({
            liked: [],
            history: [
                {
                    _id: "122",
                    title: "video two"
                },
                {
                    _id: "123",
                    title: "video three"
                }
            ],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should add to watch later", () => {

        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addToWatchLater = {
            type: "ADD_TO_WATCHLATER",
            payload: {
                _id: "121",
                title: "video one"
            }
        }

        const userState = dataReducer(initialState, addToWatchLater);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [
                {
                    _id: "121",
                    title: "video one"
                }
            ],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should remove from watch later", () => {
        const initialState = {
            liked: [],
            history: [],
            watchLater: [
                {
                    _id: "121",
                    title: "video one"
                }
            ],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const removeFromWatchLater = {
            type: "REMOVE_FROM_WATCHLATER",
            payload: "121"
        }

        const userState = dataReducer(initialState, removeFromWatchLater);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should add notes", () => {
        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addNewNotes = {
            type: "ADD_NEW_NOTES",
            payload: {
                videoId: "121",
                inputValue: "text one"
            }
        }

        let userState = dataReducer(initialState, addNewNotes);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [
                {
                    _id: "121",
                    notes: ["text one"]
                }
            ],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        });


        const addAnotherNotes = {
            type: "ADD_NEW_NOTES",
            payload: {
                videoId: "122",
                inputValue: "text one"
            }
        }

        userState = dataReducer(userState, addAnotherNotes);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [
                {
                    _id: "121",
                    notes: ["text one"]
                },
                {
                    _id: "122",
                    notes: ["text one"]
                }
            ],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })


        const addTextIntoExistingNote = {
            type: "ADD_NOTES",
            payload: {
                videoId: "121",
                inputValue: "text two"
            }
        }

        userState = dataReducer(userState, addTextIntoExistingNote);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [
                {
                    _id: "121",
                    notes: ["text one", "text two"]
                },
                {
                    _id: "122",
                    notes: ["text one"]
                }
            ],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should create playlist", () => {
        
        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const createPlaylist = {
            type: "CREATE_PLAYLIST",
            payload: {
                _id: "211", 
                name: "playlist one", 
                list:[
                    {
                        _id: "121",
                        title: "video one"
                    },
                ]
            }
        };

        const userState = dataReducer(initialState, createPlaylist);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "121",
                            title: "video one"
                        },
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should remove playlist", () => {

        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "121",
                            title: "video one"
                        },
                    ]
                },

                {
                    _id: "212", 
                    name: "playlist two", 
                    list:[
                        {
                            _id: "123",
                            title: "video three"
                        },
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const removePlaylist = {
            type: "REMOVE_PLAYLIST",
            payload: "211"
        }

        const userState = dataReducer(initialState, removePlaylist);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "212", 
                    name: "playlist two", 
                    list:[
                        {
                            _id: "123",
                            title: "video three"
                        },
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should add to playlist", () => {

        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "121",
                            title: "video one"
                        },
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const addToPlaylist = {
            type: "ADD_TO_PLAYLIST",
            payload: {
                playlistId: "211",
                video: {
                    _id: "122",
                    title: "video two"
                }
            }
        }


        const userState = dataReducer(initialState, addToPlaylist);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "121",
                            title: "video one"
                        },
                        {
                            _id: "122",
                            title: "video two"
                        }
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        });
    });

    it("should remove from playlist", () => {
        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "121",
                            title: "video one"
                        },
                        {
                            _id: "122",
                            title: "video two"
                        }
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const removeFromPlaylist = {
            type: "REMOVE_FROM_PLAYLIST",
            payload: {
                playlistId: "211", 
                videoId: "121"
            }
        }

        const userState = dataReducer(initialState, removeFromPlaylist);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [
                {
                    _id: "211", 
                    name: "playlist one", 
                    list:[
                        {
                            _id: "122",
                            title: "video two"
                        }
                    ]
                }
            ],
            playlistModal: {
                show: false,
                video: null,
            },
        })
    });

    it("should change value of playlist modal", () => {

        const initialState = {
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: false,
                video: null,
            },
        }

        const toggleModal = {
            type: "TOGGLE_MODAL",
            payload: {
                _id: "121",
                title: "video one"
            }
        }

        const userState = dataReducer(initialState, toggleModal);

        expect(userState).toEqual({
            liked: [],
            history: [],
            watchLater: [],
            allNotes: [],
            playlist: [],
            playlistModal: {
                show: true,
                video: {
                    _id: "121",
                    title: "video one"
                },
            },
        })
    })
});