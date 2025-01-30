import React from "react";
import "../style/Header.css";
import { FunctionContext } from "./FunctionProvider";
import { setSearchValue } from '../Store/Action';
import { useDispatch } from 'react-redux';



const Header = () => {

    const isAuthenticated = false;
    const dispatch = useDispatch();

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };
    const handleChange = (event) => {
        dispatch(setSearchValue(event.target.value));
      };
    // const { play } = useContext(FunctionContext);

    return (
        <div>
        <header className="header">
            <div className="header-logo">
                <a href="/" className="logo">SONGZ</a>
            </div>
            <div className="header-search">
                <input type="text"
                    placeholder="search for songs"
                    /* onChange={handleInputChange(setSearchSong)} */
                    onChange={handleChange} />
            </div>
            <div className="header-actions">
                    {/* {currentSong && (
                        <audio ref={audioRef} src={currentSong.src} />
                    )}
                    {currentSong && (
                        <>
                        <h3>{currentSong.title}</h3>
                        {audioStatus ? (
                        <button className="action-button" onClick={() => pauseAudio()}>pause</button>
                        ) : (
                        <button className="action-button" onClick={() => startAudio()}>start</button>
                        )}
                        </> 
                    )} */}
                    {!isAuthenticated ? (
                        <>
                            {/* <li> */}
                                <button
                                    // onClick={() => navigate("/signup")}
                                    className="action-button signup-button"
                                >
                                    Sign Up
                                </button>
                            {/* </li>
                            <li> */}
                                <button
                                    // onClick={() => ("/login")}
                                    className="action-button login-button"
                                >
                                    Login
                                </button>
                            {/* </li> */}
                        </>
                    ) : (
                        <>
                            {isAuthenticated && (
                                <ul>
                                    <li>
                                        <button
                                            // onClick={() => navigate("/")}
                                            className="action-button -button"
                                        >                                            
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            // onClick={handleLogout}
                                            className="action-button logout-button"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </>
                    )}
            </div>
        </header>
        </div>

    )
}

export default Header